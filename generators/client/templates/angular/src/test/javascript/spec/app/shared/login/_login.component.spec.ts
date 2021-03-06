<%#
Copyright 2013-2017 the original author or authors from the JHipster project.

This file is part of the JHipster project, see http://www.jhipster.tech/
for more information.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-%>

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from '../../../../../../main/webapp/app/shared/login/login.service';
import { <%=jhiPrefixCapitalized%>LoginModalComponent } from '../../../../../../main/webapp/app/shared/login/login.component';
import { StateStorageService } from '../../../../../../main/webapp/app/shared/auth/state-storage.service';
import { <%=angularXAppName%>TestModule } from '../../../test.module';
import { MockLoginService } from '../../../helpers/mock-login.service';
import { MockStateStorageService } from '../../../helpers/mock-state-storage.service';
import { MockRouter } from '../../../helpers/mock-route.service';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';

describe('Component Tests', () => {

    describe('LoginComponent', () => {

        let comp: <%=jhiPrefixCapitalized%>LoginModalComponent;
        let fixture: ComponentFixture<<%=jhiPrefixCapitalized%>LoginModalComponent>;
        let mockLoginService: any;
        let mockStateStorageService: any;
        let mockRouter: any;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [<%=angularXAppName%>TestModule],
                declarations: [<%=jhiPrefixCapitalized%>LoginModalComponent],
                providers : [
                    {
                        provide: JhiEventManager,
                        useValue:  MockEventManager
                    },
                    {
                        provide: LoginService,
                        useClass: MockLoginService
                    },
                    {
                        provide: StateStorageService,
                        useClass: MockStateStorageService
                    },
                    {
                        provide: ElementRef,
                        useValue: null
                    },
                    {
                        provide: Renderer,
                        useValue: null
                    },
                    {
                        provide: Router,
                        useValue: MockRouter
                    },
                    {
                        provide: NgbActiveModal,
                        useValue: MockActiveModal
                    }
                ]
            })
            .overrideTemplate(<%=jhiPrefixCapitalized%>LoginModalComponent, '')
            .compileComponents();

            beforeEach(() => {
                fixture = TestBed.createComponent(<%=jhiPrefixCapitalized%>LoginModalComponent);
                comp = fixture.componentInstance;
                mockLoginService = fixture.debugElement.injector.get(LoginService);
                mockStateStorageService = fixture.debugElement.injector.get(StateStorageService);
                mockRouter = fixture.debugElement.injector.get(Router);
                mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
                mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
            });

            it('should authenticate the user upon login when previous state was set', () => {
                // GIVEN
                const credentials = {
                    username: 'admin',
                    password: 'admin',
                    rememberMe: true
                }
                comp.credentials = credentials;
                mockLoginService.setResponse({});
                mockStateStorageService.setResponse({redirect: 'dummy'});

                // WHEN
                comp.login();

                // THEN
                expect(mockActiveModal.dismissSpy).toHaveBeenCalledWith('login success');
                expect(mockActiveModal.dismissSpy).toHaveBeenCalledWith('login success');
                expect(comp.authenticationError).toEqual(false);
                expect(mockEventManager.broadcastSpy).toHaveBeenCalledTimes(1);
                expect(mockRouter.navigateSpy).toHaveBeenCalledWith(['']);
                expect(mockLoginService.loginSpy).toHaveBeenCalledWith(credentials);
                expect(mockStateStorageService.getUrlSpy).toHaveBeenCalledTimes(1);
                expect(mockStateStorageService.storeUrlSpy).toHaveBeenCalledWith(null);
                expect(mockRouter.navigateSpy).toHaveBeenCalledWith([{redirect: 'dummy'}]);
            });

            it('should authenticate the user upon login when previous state was not set', () => {
                // GIVEN
                const credentials = {
                    username: 'admin',
                    password: 'admin',
                    rememberMe: true
                }
                comp.credentials = credentials;
                mockLoginService.setResponse({});
                mockStateStorageService.setResponse(null);

                // WHEN
                comp.login();

                // THEN
                expect(mockActiveModal.dismissSpy).toHaveBeenCalledWith('login success');
                expect(comp.authenticationError).toEqual(false);
                expect(mockEventManager.broadcastSpy).toHaveBeenCalledTimes(1);
                expect(mockRouter.navigateSpy).toHaveBeenCalledWith(['']);
                expect(mockLoginService.loginSpy).toHaveBeenCalledWith(credentials);
                expect(mockStateStorageService.getUrlSpy).toHaveBeenCalledTimes(1);
                expect(mockStateStorageService.storeUrlSpy).not.toHaveBeenCalled();
                expect(mockRouter.navigateSpy).not.toHaveBeenCalled();
            });

            it('should empty the credentials upon cancel ', () => {
                // GIVEN
                const credentials = {
                    username: 'admin',
                    password: 'admin',
                    rememberMe: true
                }

                const expected = {
                    username: null,
                    password: null,
                    rememberMe: true
                }

                comp.credentials = credentials;

                // WHEN
                comp.cancel();

                // THEN
                expect(comp.authenticationError).toEqual(false);
                expect(comp.credentials).toEqual(expected);
                expect(mockActiveModal.dismissSpy).toHaveBeenCalledWith('cancel');
            });

            it('should redirect user when register', () => {
                // WHEN
                comp.register();

                // THEN
                expect(mockActiveModal.dismissSpy).toHaveBeenCalledWith('to state register');
                expect(mockRouter.navigateSpy).toHaveBeenCalledWith(['/register']);
            });

            it('should redirect user when request password', () => {
                // WHEN
                comp.requestResetPassword();

                // THEN
                expect(mockActiveModal.dismissSpy).toHaveBeenCalledWith('to state requestReset');
                expect(mockRouter.navigateSpy).toHaveBeenCalledWith(['/reset', 'request']);
            });
        }))
    });
});
