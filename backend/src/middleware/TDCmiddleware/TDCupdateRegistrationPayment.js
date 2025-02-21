import { TDCRegistrationPayment } from "../models/init.Model.js";

export async function createTDCRegistrationPayment(
  participationId,
  prn,
  amount,
  status
) {
  try {
    const newPayment = await TDCRegistrationPayment.create({
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
