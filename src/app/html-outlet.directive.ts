import {
  Compiler, Component, ComponentFactory, ComponentRef, Directive, Input, ModuleWithComponentFactories, NgModule,
  OnChanges, OnDestroy,
  ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DynamicValues} from './app.component';
import {MdButton, MdButtonModule} from '@angular/material';

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {

  // Could be <any>
  const cmpClass = class DynamicComponent {
    values: DynamicValues;
  };
  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({imports: [CommonModule, MdButtonModule, RouterModule], declarations: [decoratedCmp]})
  class DynamicHtmlModule {
  }

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
    });
}

@Directive({
  selector: '[appHtmlOutlet]'
})
export class HtmlOutletDirective implements OnChanges, OnDestroy {

  @Input() combined: { html: string, values: DynamicValues };

  componentRef: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef, private compiler: Compiler) {
  }

  ngOnChanges() {
    if (!this.combined) {
      return;
    }

    const html = this.combined.html;
    const values = this.combined.values;

    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-html',
      template: html,
      entryComponents: [MdButton]
    });

    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainerRef.parentInjector);
        this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, []);
        (this.componentRef.instance).values = values;
      });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
