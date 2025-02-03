// models/index.js

import sequelize from "../db/index.js";
import Academy from "./academy.Model.js";
import AgeGroup from "./ageGroup.Model.js";
// import Category from "./category.Model.js";
import Contact from "./contact.Model.js";
import Gallery from "./gallery.Model.js";
import Game from "./game.Model.js";
import ManualRegistration from "./manualRegistration.Model.js";
import Participation from "./participation.Model.js";
import Partners from "./partners.Model.js";
import Program from "./program.Model.js";
import RegistrationPayment from "./registrationPayement.Model.js";
import School from "./school.Model.js";
import SpecialCamps from "./specialCamps.Model.js";
import Users from "./user.Model.js";
import Certificate from "./certificate.Model.js";
import PointsTable from "./pointsTable.Model.js";
import GamePointsTable from "./gamePointsTable.js";
import GameGroup from "./gameGroup.js";
import Career from "./career.Model.js";
import Application from "./application.Model.js";




import TDCRegistrationPayment from "./TDCmodel/TDCregistrationPayment.Model.js";
import TDCGame from "./TDCmodel/TDCgame.Model.js";
import TDCSchool from "./TDCmodel/TDCSchool.Model.js";
import TDCParticipation from "./TDCmodel/TDCparticipation.Model.js";



// Academy and Program
Academy.hasMany(Program, { foreignKey: "academyId" });
Program.belongsTo(Academy, { foreignKey: "academyId" });

// Program and AgeGroup
Program.hasMany(AgeGroup, { foreignKey: "programId" });
AgeGroup.belongsTo(Program, { foreignKey: "programId" });

RegistrationPayment.belongsTo(Participation, { foreignKey: "participationId" });
Participation.hasOne(RegistrationPayment, { foreignKey: "participationId" });

// **Many-to-Many Relationship Between School and Game via Participation**
School.belongsToMany(Game, {
  through: Participation,
  foreignKey: "schoolId",
  otherKey: "gameId",
  as: "games", // Alias for association
});

Game.belongsToMany(School, {
  through: Participation,
  foreignKey: "gameId",
  otherKey: "schoolId",
  as: "schools", // Alias for association
});
// School and Participation
School.hasMany(Participation, { foreignKey: "schoolId" });
Participation.belongsTo(School, { foreignKey: "schoolId" });

// Game and Participation
Game.hasMany(Participation, { foreignKey: "gameId" });
Participation.belongsTo(Game, { foreignKey: "gameId" });

// Associations game group and school
GameGroup.hasMany(GamePointsTable, { foreignKey: "groupId" });
GamePointsTable.belongsTo(Game, { foreignKey: "gameId" });
GamePointsTable.belongsTo(School, { foreignKey: "schoolId" });













// rakesh sir code enhancement for thunderbolts development center
TDCRegistrationPayment.belongsTo(TDCParticipation, {
  foreignKey: "participationId",
});
TDCParticipation.hasOne(TDCRegistrationPayment, {
  foreignKey: "participationId",
});

// **Many-to-Many Relationship Between School and Game via Participation**
TDCSchool.belongsToMany(TDCGame, {
  through: TDCParticipation,
  foreignKey: "schoolId",
  otherKey: "gameId",
  as: "TDCgames", // Alias for association
});

TDCGame.belongsToMany(TDCSchool, {
  through: TDCParticipation,
  foreignKey: "gameId",
  otherKey: "schoolId",
  as: "TDCschools", // Alias for association
});
// TDCSchool and TDCParticipation
TDCSchool.hasMany(TDCParticipation, { foreignKey: "schoolId" });
TDCParticipation.belongsTo(TDCSchool, { foreignKey: "schoolId" });

// TDCGame and TDCParticipation
TDCGame.hasMany(TDCParticipation, { foreignKey: "gameId" });
TDCParticipation.belongsTo(TDCGame, { foreignKey: "gameId" });

export {
  Academy,
  AgeGroup,
  Contact,
  Gallery,
  Game,
  ManualRegistration,
  Participation,
  Partners,
  Program,
  RegistrationPayment,
  School,
  SpecialCamps,
  // Category,
  Users,
  Certificate,
  PointsTable,
  GamePointsTable,
  GameGroup,
  Career,
  Application,

  //   rakesh tdc model
  TDCGame,
  TDCParticipation,
  TDCSchool,
  TDCRegistrationPayment,
};
