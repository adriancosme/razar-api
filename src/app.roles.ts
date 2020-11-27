import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
	STANDARD = 'STANDARD',
	ADMIN = 'ADMIN',
}

export enum AppResource {
	USER = 'USER'
}

export const roles: RolesBuilder = new RolesBuilder();
roles
	.grant(AppRoles.STANDARD)
	.updateOwn([AppResource.USER])
	.createOwn([AppResource.USER])
roles
	.grant(AppRoles.ADMIN)
	.extend(AppRoles.STANDARD)
	.createAny([AppResource.USER])
	.updateAny([AppResource.USER])
	.deleteAny([AppResource.USER])
