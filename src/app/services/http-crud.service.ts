import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCrudService {

  // private readonly booksUrl = '/api/books';
  // private readonly loansUrl = '/api/loans';

  // constructor(private readonly http: HttpClient) {
  // }

  // addLoan(loan: Loan): Observable<Loan> {
  //   return this.http.post<Loan>(`${this.loansUrl}`, loan);
  // }

  // addBook(book: Book): Observable<Book> {
  //   return this.http.post<Book>(`${this.booksUrl}`, book);
  // }

  // getBooksFromHttp(): Observable<Array<Book>> {
  //   return this.http.get<Array<Book>>(this.booksUrl);
  // }

  // getLoansFromHttp(): Observable<Array<Loan>> {
  //   return this.http.get<Array<Loan>>(this.loansUrl);
  // }

  // getLoansSortByLoanDate(numberOfLoans: number): Observable<Array<Loan>> {
  //   return this.getLoansFromHttp()
  //     .pipe(map(loans => loans
  //       .sort((a: Loan, b: Loan) => new Date(b.loanDate).getTime() - new Date(a.loanDate).getTime())
  //       .splice(0, numberOfLoans)));
  // }

  // getLoansByISBN(ISBN: string): Observable<Array<Loan>> {
  //   return this.getLoansFromHttp()
  //     .pipe(map(loans => loans
  //       .filter(loan => loan.isbn === ISBN)));
  // }

  // getBookByISBN(ISBN: string): Observable<Book> {
  //   return this.getBooksFromHttp()
  //     .pipe(map(books => books.find(book => book.isbn === ISBN)));
  // }

  // getBookCategories(): Array<string> {
  //   return [
  //     'Poetry',
  //     'Prose',
  //     'Drama',
  //     'Science Fiction',
  //     'Media'
  //   ];
  // }

  // updateBook(book: Book): Observable<Book> {
  //   return this.http.put<Book>(`${this.booksUrl}/${book.id}`, book);
  // }

  // deleteLoan(loan: Loan): Observable<Loan> {
  //   return this.http.delete<Loan>(`${this.loansUrl}/${loan.id}`);
  // }
}
