import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService, DValidateRules, FormLayout, Message } from 'ng-devui';
import { I18nService } from 'ng-devui/i18n';
import { Subject } from 'rxjs';

import { PersonalizeService } from 'src/app/@core/services/personalize.service';

import { ThemeType } from '../../models/theme';

@Component({
  selector: 'da-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private destroy$ = new Subject();

  verticalLayout: FormLayout = FormLayout.Vertical;

  showPassword = false;
  showConfirmPassword = false;
  toastMessage: Message[];

  formData = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  formRules: { [key: string]: DValidateRules } = {
    emailRules: {
      validators: [{ required: true }, { email: true }],
    },
    passwordRules: {
      validators: [{ required: true }, { minlength: 6 }, { maxlength: 15 }, { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/ }],
      message: 'Enter a password that contains 6 to 15 digits and letters.',
    },
    confirmPasswordRules: [
      { required: true },
      {
        sameToPassWord: this.sameToPassWord.bind(this),
        message: { 'en-us': 'Ensure that the two passwords are the same.', 'zh-cn': '请确保密码一致' },
      },
      { minlength: 6 },
      { maxlength: 15 },
      { pattern: /^[a-zA-Z0-9\d@$!%*?&.]+(\s+[a-zA-Z0-9]+)*$/, message: 'The password must contain 6 to 15 digits and letters.' },
    ],
  };

  constructor(
    private route: Router,
    
    private i18n: I18nService,
    private dialogService: DialogService,
    private personalizeService: PersonalizeService
  ) {}

  ngOnInit(): void {
    
    this.personalizeService.setRefTheme(ThemeType.Default);
  }

  register(result: any) {
    if (result.valid) {
      const results = this.dialogService.open({
        id: 'register-result',
        width: '350px',
        maxHeight: '600px',
        title: '注册成功',
        content: '你的账号注册成功，即将返回登录页面进行登录',
        backdropCloseable: false,
        dialogtype: 'success',
        buttons: [
          {
            cssClass: 'primary',
            text: 'Ok',
            handler: ($event: Event) => {
              this.goToLogin(results);
            },
          },
        ],
      });
      setTimeout(() => {
        this.goToLogin(results);
      }, 3000);
    }
  }

  goToLogin(dialogResult: any) {
    dialogResult.modalInstance.hide();
    this.route.navigate(['/login']);
  }

  

  sameToPassWord(value: string) {
    return value === this.formData.password;
  }
}