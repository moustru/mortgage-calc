import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface CalcFormValue {
  estatePrice: number;
  initialFee: number;
  term: number;
  isSalaryCard: boolean;
  isInsurance: boolean;
  isOnlineReg: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  calcForm: FormGroup = new FormGroup({})

  monthlyPayment = 0
  interestRate = 19
  creditSum = 0
  taxDeduction = 0
  necessaryIncome = 0

  termOutput: number = 1

  destroy$ = new Subject()

  createForm(): void {
    this.calcForm = this.fb.group({
      estatePrice: 0,
      initialFee: 0,
      term: 1,
      isSalaryCard: false,
      isInsurance: false,
      isOnlineReg: false
    })
  }

  changeInterestRate(triggerValue: boolean, delta: number): void {
    triggerValue ? this.interestRate -= delta : this.interestRate += delta
  }

  getYearSign(): string {
    switch (this.termOutput) {
      case 1:
        case 21:
          return 'год'
      case 2:
        case 3:
          case 4:
            case 22:
              case 23:
                case 24:
                  return 'года'
      default:
        return 'лет'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnInit(): void {
    this.calcForm.get('isSalaryCard')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.changeInterestRate(val, 0.5)
      })

    this.calcForm.get('isInsurance')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.changeInterestRate(val, 1)
      })

    this.calcForm.get('isOnlineReg')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.changeInterestRate(val, 0.3)
      })

    this.calcForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: CalcFormValue) => {
        // Сумма переплаты
        const overPayment = this.creditSum * (this.interestRate * val.term / 100)

        // Сумма кредита
        this.creditSum = val.estatePrice - val.initialFee

        // Налоговый вычет
        this.taxDeduction = val.estatePrice * 0.13 + overPayment * 0.13

        // Ежемесячный платеж
        this.monthlyPayment = (this.creditSum + overPayment) / (val.term * 12)

        // Вывод срока кредитования в шаблон
        this.termOutput = val.term
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
