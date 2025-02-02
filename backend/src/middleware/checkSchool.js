import { School } from "../models/init.Model.js";

export async function checkSchoolExists(name, email, contact) {
	const existingSchool = await School.findOne({
		where: {
			[Sequelize.Op.or]: [{ name: name }, { email: email }, {contact: contact}],
		},
	});

	return existingSchool !== null;
}
