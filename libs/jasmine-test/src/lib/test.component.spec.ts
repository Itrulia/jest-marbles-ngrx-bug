import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestComponent, mySelector } from '@jest-marbles-ngrx-bug/test';
import { hot, cold } from 'jasmine-marbles';

describe('Jasmine Marbles', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should override the selector (toBeObservable hot)', () => {
    store.overrideSelector(mySelector, 'You should see this');
    fixture.detectChanges();

    const expected = hot('a', { a: 'You should see this' });
    expect(component.myObservable$).toBeObservable(expected);
  });

  it('should override the selector (toBeObservable cold)', () => {
    store.overrideSelector(mySelector, 'You should see this');
    fixture.detectChanges();

    const expected = cold('a', { a: 'You should see this' });
    expect(component.myObservable$).toBeObservable(expected);
  });

  it('should override the selector (subscribe)', (done) => {
    store.overrideSelector(mySelector, 'You should see this');
    fixture.detectChanges();

    component.myObservable$!.subscribe((value) => {
      expect(value).toBe('You should see this');
      done();
    });
  });
});
