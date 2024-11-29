import { HttpInterceptorFn } from '@angular/common/http';

export const epreuveInterceptor: HttpInterceptorFn = (req, next) => {

  const apiKey = '03uRm35v+HVe/0Z7ZiPZiw==nXZywLhYndX6ZiTT';

  const reqHeader = req.clone({
    headers: req.headers.set(
      'X-Api-key',
      apiKey
    )
  })

  return next(reqHeader);
};
