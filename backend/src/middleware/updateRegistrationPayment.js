import { RegistrationPayment } from "../models/init.Model.js";

export async function createRegistrationPayment(
  participationId,
  prn,
  amount,
  status
) {
  try {
    const newPayment = await RegistrationPayment.create({
      amount: amount,
      status: status,
      prn: prn,
      participationId: participationId,
    });
    return newPayment;
  } catch (error) {
    console.error("Error creating RegistrationPayment record:", error);
    throw new Error("Unable to create payment record.");
  }
}
