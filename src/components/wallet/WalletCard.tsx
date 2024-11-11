import React, { useEffect, useState, lazy, Suspense } from "react";
import RightAngleIcon from "../icons/rightAngleIcon";
import PropTypes from "prop-types";
import accounts from "../../../db/accounts";

export interface WalletCardProps {
  id: string;
  currency: string;
  hold: string;
  pending_balance: number;
  balance: string;
  name: string;
  type: string;
  deposit: boolean;
  payout: boolean;
  imgURL: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  id,
  currency,
  hold,
  pending_balance,
  balance,
  name,
  type,
  deposit,
  payout,
  imgURL,
}) => {
  return (
    <>
      <div className="card" id={id}>
        <div className="w-full flex justify-start">
          <img
            className="h-10 w-10 rounded-full"
            src={imgURL}
            alt="user-avatar"
          />
          {name}
        </div>
        <div className="w-full flex justify-start">
          <span className="amount" title='accounts.balance'>{balance} {currency}</span>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="rounded-full card-arrow items-center">
            <RightAngleIcon />
          </div>
        </div>
      </div>
    </>
  );
};

// WalletCard.propTypes = {
//   username: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };

export default WalletCard;
