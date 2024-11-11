import React, { ReactEventHandler, useEffect, useState } from "react";
import CloseIcon from "../icons/closeIcon";
import { Button } from "../shared/button";
import Loader from "../shared/Loader";
import ErrorSpace from "./ErrorSpace";
import NetworkErrorIcon from "../icons/NetworkErrorIcon";
// import PropTypes from "prop-types";

interface Account {
  currency: string;
  name: string;
  type: string;
  imgURL: string;
}
interface Props {
  setClose?: ReactEventHandler;
  refresh?: ReactEventHandler;
}
const AddWallet: React.FC<Props> = ({ setClose, refresh }: any) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [networkError, setNetworkError] = useState<String | null>("");
  const [formError, setFormError] = useState<String | null>(null);

  const NetworkErrorFallBack = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <NetworkErrorIcon />
        <p>Network Error</p>
        <div className="text-center">
          <Button onClick={() => fetchWallets()} className="rounded btn">
            Try Again
          </Button>
        </div>
      </div>
    );
  };
  const fetchWallets = async () => {
    setNetworkError(null);
    setFormError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3090/wallets");
      if (!response.ok) {
        setNetworkError("Network Error");
      }
      const data = await response.json();
      setAccounts(data);
      setLoading(false);
    } catch (error: any) {
      setNetworkError("Network Error");
      setLoading(false);
    }
  };
  const handleClose = () => {
    setClose();
  };
  const handleInputChange = (e: any) => {
    e.preventDefault();
    setSelectedAccount(e.target && e.target?.value);
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setCreating(true);
    try {
      const resp: any = await fetch("http://localhost:3090/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: selectedAccount,
        }),
      });

      if (!resp.ok) {
        // setFormError(`${resp?.statusText}` ?? "Network Error");
        setCreating(false);
        return setFormError(`Network Error`);
      }
      const data = await resp.json();
      // setAccounts([...accounts, data]);
      setCreating(false);
      refresh();
      setClose();
    } catch (error: any) {
      setCreating(false);
      setFormError("Network Error");
    }
  };

  useEffect(() => {
    fetchWallets();
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <div className="relative">
        {
          <ErrorSpace fallBack={<NetworkErrorFallBack />}>
            {
              <>
                <div className="modal">
                  <div className="flex justify-end modal-header">
                    <h3>Add new wallet</h3>
                    <Button
                      onClick={() => handleClose()}
                      name="Close button"
                      title="Close button"
                    >
                      <label title="Close button" />
                      <CloseIcon />
                    </Button>
                  </div>
                  <p className="mt-6 w-72">
                    The crypto wallet will be created instantly and be available
                    in your list of wallets.
                  </p>

                  {loading ? (
                    <div className="modal flex flex-col items-center justify-center h-screen">
                      <div>
                        <Loader />
                      </div>
                    </div>
                  ) : networkError ? (
                    <NetworkErrorFallBack />
                  ) : (
                    <ErrorSpace fallBack={<NetworkErrorFallBack />}>
                      <form onSubmit={(e) => handleSubmitForm(e)}>
                        <label htmlFor="wallet">Select Wallet</label>
                        <div>
                          <select
                            className="p-3 modal-select"
                            value={selectedAccount || ""}
                            id="wallet"
                            onChange={(e) => handleInputChange(e)}
                          >
                            <option value="" disabled>
                              Select Wallet
                            </option>
                            {accounts?.map((account: Account) => (
                              <option
                                key={`${account.currency}-key-account`}
                                value={account.currency}
                              >
                                {account.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Button
                          type="submit"
                          className="rounded"
                          disabled={creating}
                        >
                          {creating ? "Loading..." : "Create Wallet"}
                        </Button>
                        {formError}
                      </form>
                    </ErrorSpace>
                  )}
                </div>
              </>
            }
          </ErrorSpace>
        }
      </div>
    </>
  );
};

// Wallet.propTypes = {
//   username: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };

export default AddWallet;
