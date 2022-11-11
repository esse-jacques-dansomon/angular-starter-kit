import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of, OperatorFunction} from 'rxjs';
import {map, startWith, catchError} from 'rxjs/operators';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform(val: { pipe: (arg0: OperatorFunction<any, { loading: boolean; value: any; }>, arg1: OperatorFunction<{ loading: boolean; value: any; }, { loading: boolean; value: any; } | { loading: boolean; }>, arg2: OperatorFunction<{ loading: boolean; value: any; } | { loading: boolean; }, { loading: boolean; value: any; } | { loading: boolean; } | { loading: boolean; error: any; }>) => any; }) {
      return isObservable(val)
         ? val.pipe(
            map((value: any) => ({ loading: false, value })),
            startWith({ loading: true }),
            catchError(error => of({ loading: false, error }))
         )
         : val;
   }
}
