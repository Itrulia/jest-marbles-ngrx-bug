import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { createSelector, Store } from '@ngrx/store';

export const mySelector = createSelector(
  (state) => ({}),
  (state) => 'You should not see this'
);

@Component({
  template: '',
})
export class TestComponent implements OnInit {
  public myObservable$?: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.myObservable$ = this.store.select(mySelector);
  }
}
