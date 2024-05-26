import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  id = Math.floor(Math.random() * 1000);
  data = input.required<{ key: string; value: number }[]>();
  width = input(500);
  height = input<number>(100);
  marginTop = input<number>(20);
  marginLeft = input<number>(0);
  marginRight = input<number>(0);
  marginBottom = input<number>(20);
  xScale?: d3.ScaleBand<string>;
  yScale?: d3.ScaleLinear<number, number, never>;
  svg?: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>; //eslint-disable-line

  verticalMinMax: number[] = [];
  constructor() {
    effect((onCleanup) => {
      this.verticalMinMax = [
        d3.min(this.data(), (d) => d.value) || 0 - 1,
        d3.max(this.data(), (d) => d.value) || 0 + 1,
      ];
      this.svg = d3
        .select('figure#line-chart-' + this.id)
        .append('svg')
        .attr('width', '100%')
        .attr('height', this.height())
        .attr('viewBox', [0, 0, this.width(), this.height()])
        .attr('style', 'max-width: 100%;max-height:300px; height: auto; ');
      this.horizontalConfiguration();
      this.verticalConfiguration();
      this.lineConfiguration();

      onCleanup(() => {
        this.svg?.remove();
      });
    });
  }

  private horizontalConfiguration() {
    this.xScale = d3
      .scaleBand()
      .domain(this.data().map((x) => x.key))
      .range([this.marginLeft(), this.width() - this.marginRight()]);

    this.svg!.append('g')
      .attr(
        'transform',
        `translate(${this.marginLeft()},${
          this.height() - this.marginBottom() + 3
        })`
      )
      .call(
        d3
          .axisBottom(this.xScale!)
          .ticks(this.data().length)
          .tickSizeOuter(0)
          .tickSizeInner(0)
      );
  }
  private verticalConfiguration() {
    this.yScale = d3.scaleLinear(this.verticalMinMax, [
      this.height() - this.marginBottom(),
      this.marginTop(),
    ]);

    this.svg!.append('g')
      .attr('transform', `translate(${this.marginLeft()},0)`)
      .attr('stroke-opacity', 0)
      .call(d3.axisLeft(this.yScale!).ticks(4))
      .call((g) => g.selectAll('.tick text').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('x2', this.width() - this.marginLeft() - this.marginRight())
          .attr('stroke-opacity', 0.1)
      );
  }
  private lineConfiguration() {
    const line = d3
      .line<{ key: string; value: number }>()
      .x((d) => this.xScale!(d['key'])!)
      .y((d) => this.yScale!(d['value']));

    this.svg!.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('style', `transform:translate(30px, 0px)`)
      .attr('d', line(this.data()));

    this.data().forEach((data) => {
      this.svg!.append('text')
        .attr('x', () => this.xScale!(data.key)!)
        .attr('y', () => {
          return this.yScale!(data.value);
        })
        .attr(
          'style',
          `font-size:9px; transform:translate(${
            15 + (data.value < 100 ? 9 : -3)
          }px,-7px)`
        )
        .text(() => {
          return data.value;
        });
    });
  }
}
