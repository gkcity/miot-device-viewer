import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

export function MyHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authReq = req.clone({
    withCredentials: false
  });

  console.log(req.url);

  return next(authReq).pipe(
    map((event: HttpEvent<unknown>) => {
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('请求出错: ', error);
      return throwError(() => error);
    }));
}
