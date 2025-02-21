import { TDCSchool } from "../../models/init.Model.js";

export async function TDCcheckSchoolExists(name, email, contact) {
	const existingSchool = await TDCSchool.findOne({
		where: {
			[Sequelize.Op.or]: [{ name: name }, { email: email }, {contact: contact}],
		},
	});

	return existingSchool !== null;
}
