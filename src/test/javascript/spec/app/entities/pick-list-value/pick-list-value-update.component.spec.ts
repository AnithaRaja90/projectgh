/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjectGhTestModule } from '../../../test.module';
import { PickListValueUpdateComponent } from 'app/entities/pick-list-value/pick-list-value-update.component';
import { PickListValueService } from 'app/entities/pick-list-value/pick-list-value.service';
import { PickListValue } from 'app/shared/model/pick-list-value.model';

describe('Component Tests', () => {
    describe('PickListValue Management Update Component', () => {
        let comp: PickListValueUpdateComponent;
        let fixture: ComponentFixture<PickListValueUpdateComponent>;
        let service: PickListValueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectGhTestModule],
                declarations: [PickListValueUpdateComponent]
            })
                .overrideTemplate(PickListValueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PickListValueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PickListValueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PickListValue(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pickListValue = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PickListValue();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pickListValue = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
