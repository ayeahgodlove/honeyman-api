import { IPayment } from "../Contracts/IPayment";
import { DataTypes, Sequelize } from "sequelize";

export const PaymentTable = (sequelize: Sequelize) => {
  const Payment = sequelize.define<IPayment>(
    "Payments",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      orderNo: {
        type: DataTypes.STRING(40),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  return Payment;
};
