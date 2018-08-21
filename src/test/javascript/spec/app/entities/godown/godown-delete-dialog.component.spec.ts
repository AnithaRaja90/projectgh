/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectGhTestModule } from '../../../test.module';
import { GodownDeleteDialogComponent } from 'app/entities/godown/godown-delete-dialog.component';
import { GodownService } from 'app/entities/godown/godown.service';

describe('Component Tests', () => {
    describe('Godown Management Delete Component', () => {
        let comp: GodownDeleteDialogComponent;
        let fixture: ComponentFixture<GodownDeleteDialogComponent>;
        let service: GodownService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectGhTestModule],
                declarations: [GodownDeleteDialogComponent]
            })
                .overrideTemplate(GodownDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GodownDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GodownService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});