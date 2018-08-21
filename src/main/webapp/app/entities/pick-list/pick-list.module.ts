import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectGhSharedModule } from 'app/shared';
import {
    PickListComponent,
    PickListDetailComponent,
    PickListUpdateComponent,
    PickListDeletePopupComponent,
    PickListDeleteDialogComponent,
    pickListRoute,
    pickListPopupRoute
} from './';

const ENTITY_STATES = [...pickListRoute, ...pickListPopupRoute];

@NgModule({
    imports: [ProjectGhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PickListComponent,
        PickListDetailComponent,
        PickListUpdateComponent,
        PickListDeleteDialogComponent,
        PickListDeletePopupComponent
    ],
    entryComponents: [PickListComponent, PickListUpdateComponent, PickListDeleteDialogComponent, PickListDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectGhPickListModule {}
