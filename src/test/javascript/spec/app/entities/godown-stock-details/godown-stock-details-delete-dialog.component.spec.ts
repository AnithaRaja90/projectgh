/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectGhTestModule } from '../../../test.module';
import { GodownStockDetailsDeleteDialogComponent } from 'app/entities/godown-stock-details/godown-stock-details-delete-dialog.component';
import { GodownStockDetailsService } from 'app/entities/godown-stock-details/godown-stock-details.service';

describe('Component Tests', () => {
    describe('GodownStockDetails Management Delete Component', () => {
        let comp: GodownStockDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<GodownStockDetailsDeleteDialogComponent>;
        let service: GodownStockDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectGhTestModule],
                declarations: [GodownStockDetailsDeleteDialogComponent]
            })
                .overrideTemplate(GodownStockDetailsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GodownStockDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GodownStockDetailsService);
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
