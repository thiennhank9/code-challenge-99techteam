import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Select,
  Button,
  Typography,
  message,
  Space,
  Input,
  Card,
} from "antd";
import CurrencyOption from "./components/CurrencyOption";
import LoadingOverlay from "./components/LoadingOverlay"; // Import the new LoadingOverlay component
import ConfirmationModal from "./components/ConfirmationModal"; // Import the new ConfirmationModal component
import ArrowDownIcon from "./components/ArrowDownIcon"; // Import the new ArrowDownIcon component
import "./CurrencySwapForm.css";

const { Title } = Typography;
const { Option } = Select;

const CurrencySwapForm: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [sourceCurrency, setSourceCurrency] = useState<string>("");
  const [targetCurrency, setTargetCurrency] = useState<string>("");
  const [sourceAmount, setSourceAmount] = useState<number>(0);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch exchange rates from the API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        const data = await response.json();

        const rates: Record<string, number> = {};
        const currencyList: string[] = [];
        data.forEach((item: { currency: string; price: number }) => {
          rates[item.currency] = item.price;
          currencyList.push(item.currency);
        });

        setExchangeRates(rates);
        setCurrencies(Array.from(new Set(currencyList))); // Remove duplicates

        // Set default source and target currencies
        if (currencyList.length >= 2) {
          setSourceCurrency(currencyList[0]); // First currency as source
          setTargetCurrency(currencyList[1]); // Second currency as target
        }
      } catch {
        message.error(
          "Failed to fetch exchange rates. Please try again later."
        );
      } finally {
        // Ensure the loading indicator lasts at least 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleSourceAmountChange = useCallback(
    (value: string) => {
      const amount = parseFloat(value) || 0;
      setSourceAmount(amount);

      // Do not calculate target amount if source amount is zero or negative
      if (amount <= 0) {
        setErrorMessage("Source amount must be a positive number.");
        setTargetAmount(0);
        return;
      }

      setErrorMessage(""); // Clear error message if input is valid
      // Calculate target amount based on exchange rates
      if (sourceCurrency && targetCurrency) {
        const rate =
          exchangeRates[sourceCurrency] / exchangeRates[targetCurrency];
        setTargetAmount(amount * rate);
      }
    },
    [sourceCurrency, targetCurrency, exchangeRates]
  );

  const handleCurrencyChange = useCallback(
    (value: string, type: "source" | "target") => {
      if (type === "source") {
        setSourceCurrency(value);
      } else {
        setTargetCurrency(value);
      }

      // Reset the amount when currency changes
      setSourceAmount(0);
      setTargetAmount(0);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    // Validation logic
    if (sourceCurrency === targetCurrency) {
      setErrorMessage("Source and target currencies must be different.");
      return;
    }

    if (sourceAmount <= 0) {
      setErrorMessage("Source amount must be a positive number.");
      return;
    }

    // Clear error message if validation passes
    setErrorMessage("");
    setIsModalVisible(true); // Show the confirmation popup
  }, [sourceCurrency, targetCurrency, sourceAmount]);

  const handleConfirm = useCallback(() => {
    setIsSubmitting(true); // Show loading indicator in modal
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalVisible(false); // Close the popup
      setSourceAmount(0); // Reset source amount to zero
      setTargetAmount(0); // Reset target amount to zero
      message.success("Currency swap submitted successfully!");
    }, 3000); // Simulate 3-second delay
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false); // Close the popup
  }, []);

  return (
    <div className="currency-swap-form">
      {loading && <LoadingOverlay />}
      <>
        <Title level={3} className="currency-swap-title">
          Currency Swap Form
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Source Currency */}
          <Card className="currency-card" title="Source Currency">
            <Form.Item>
              <Space.Compact className="currency-input-group">
                <Select
                  className="currency-select"
                  placeholder="Select currency"
                  onChange={(value) => handleCurrencyChange(value, "source")}
                  value={sourceCurrency}
                  optionLabelProp="label"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.value as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {currencies.map((currency) => (
                    <Option
                      key={currency}
                      value={currency}
                      label={<CurrencyOption currency={currency} />}
                    >
                      <CurrencyOption currency={currency} />
                    </Option>
                  ))}
                </Select>
                <Input
                  className="currency-input"
                  placeholder="Enter amount"
                  type="number"
                  value={sourceAmount}
                  onChange={(e) => handleSourceAmountChange(e.target.value)}
                />
              </Space.Compact>
            </Form.Item>
          </Card>
          {/* Arrow Down Icon */}
          <ArrowDownIcon /> {/* Use the new ArrowDownIcon component */}
          {/* Target Currency */}
          <Card className="currency-card" title="Target Currency">
            <Form.Item>
              <Space.Compact className="currency-input-group">
                <Select
                  className="currency-select"
                  placeholder="Select currency"
                  onChange={(value) => handleCurrencyChange(value, "target")}
                  value={targetCurrency}
                  optionLabelProp="label"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.value as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {currencies.map((currency) => (
                    <Option
                      key={currency}
                      value={currency}
                      label={<CurrencyOption currency={currency} />}
                    >
                      <CurrencyOption currency={currency} />
                    </Option>
                  ))}
                </Select>
                <Input
                  className="currency-input"
                  placeholder="Exchanged amount"
                  type="number"
                  value={targetAmount}
                  readOnly
                />
              </Space.Compact>
            </Form.Item>
          </Card>
          {/* Submit Button */}
          <Form.Item className="submit-button-container">
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              disabled={sourceAmount <= 0}
            >
              Submit
            </Button>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </Form.Item>
        </Form>

        {/* Confirmation Modal */}
        <ConfirmationModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isSubmitting={isSubmitting}
          sourceCurrency={sourceCurrency}
          sourceAmount={sourceAmount}
          targetCurrency={targetCurrency}
          targetAmount={targetAmount}
        />
      </>
    </div>
  );
};

export default CurrencySwapForm;
