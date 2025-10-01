// loc.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from 'src/app/services/i18n.service';


@Pipe({ name: 'loc', pure: false })
export class LocPipe implements PipeTransform {
  constructor(private i18n: I18nService) {}
  transform(value: string | Record<string, string>): string {
    return this.i18n.pick(value);
  }
}
