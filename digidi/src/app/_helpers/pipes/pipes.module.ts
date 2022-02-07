import { NgModule } from '@angular/core';
import { SafeurlPipe } from './safeurl/safeurl';
import { SecurePipe } from './secure/secure';
@NgModule({
	declarations: [SafeurlPipe, SecurePipe],
	imports: [],
	exports: [SafeurlPipe, SecurePipe]
})
export class PipesModule {}
