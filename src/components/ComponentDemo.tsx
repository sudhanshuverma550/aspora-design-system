/**
 * Aspora Design System - Component Demo Page
 * Interactive demo showcasing all components
 */

import React, { useState } from 'react';
import { Toggle } from '../../components/Toggle';
import { RadioButton } from '../../components/RadioButton';
import { Checkbox } from '../../components/Checkbox';
import { InputField } from '../../components/InputField';
import { SearchBar } from '../../components/SearchBar';
import { Chip } from '../../components/Chip';
import { Selector } from '../../components/Selector';
import { Slider } from '../../components/Slider';
import { Button } from '../../components/Button';

// Section wrapper component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="demo-section">
    <h2 className="demo-section-title">{title}</h2>
    {children}
  </section>
);

// Demo row for displaying component variants
const DemoRow: React.FC<{ label: string; children: React.ReactNode; fullWidth?: boolean }> = ({ label, children, fullWidth }) => (
  <div className={`demo-row ${fullWidth ? 'demo-row-full' : ''}`}>
    <span className="demo-row-label">{label}</span>
    <div className="demo-row-content">
      {children}
    </div>
  </div>
);

export const ComponentDemo: React.FC = () => {
  // Toggle state
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);

  // Radio state
  const [radioValue, setRadioValue] = useState('option1');

  // Checkbox state
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkbox3, setCheckbox3] = useState(false);

  // Input state
  const [inputValue, setInputValue] = useState('');

  // Search state
  const [searchValue, setSearchValue] = useState('');

  // Chip state
  const [selectedChips, setSelectedChips] = useState<string[]>(['investments']);

  // Selector state
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Slider state
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75]);

  const toggleChip = (id: string) => {
    setSelectedChips(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <>
      <style>{`
        .demo-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        @media (max-width: 640px) {
          .demo-container {
            padding: 24px 16px;
          }
        }

        .demo-header {
          text-align: center;
          margin-bottom: 48px;
        }

        @media (max-width: 640px) {
          .demo-header {
            margin-bottom: 32px;
          }
        }

        .demo-header h1 {
          font-size: 36px;
          font-weight: 700;
          color: #5523B2;
          margin-bottom: 8px;
        }

        @media (max-width: 640px) {
          .demo-header h1 {
            font-size: 28px;
          }
        }

        .demo-header p {
          font-size: 18px;
          color: #666;
        }

        @media (max-width: 640px) {
          .demo-header p {
            font-size: 16px;
          }
        }

        .demo-section {
          background-color: white;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        @media (max-width: 640px) {
          .demo-section {
            padding: 20px 16px;
            border-radius: 12px;
            margin-bottom: 16px;
          }
        }

        .demo-section-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #0E0F11;
          border-bottom: 2px solid #5523B2;
          padding-bottom: 8px;
          display: inline-block;
        }

        @media (max-width: 640px) {
          .demo-section-title {
            font-size: 18px;
            margin-bottom: 20px;
          }
        }

        .demo-row {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .demo-row {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
          }
        }

        .demo-row-label {
          width: 100px;
          font-size: 14px;
          color: #666;
          flex-shrink: 0;
          padding-top: 4px;
        }

        @media (max-width: 640px) {
          .demo-row-label {
            width: auto;
            font-weight: 500;
            padding-top: 0;
          }
        }

        .demo-row-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          flex: 1;
          min-width: 0;
        }

        .demo-row-full .demo-row-content {
          width: 100%;
        }

        .demo-row-full .demo-row-content > div {
          width: 100%;
        }

        .demo-input-wrapper {
          width: 100%;
          max-width: 350px;
        }

        @media (max-width: 640px) {
          .demo-input-wrapper {
            max-width: 100%;
          }
        }

        .demo-slider-wrapper {
          width: 100%;
          max-width: 350px;
        }

        @media (max-width: 640px) {
          .demo-slider-wrapper {
            max-width: 100%;
          }
        }

        .demo-slider-value {
          margin-bottom: 8px;
          font-size: 14px;
          color: #666;
        }

        .demo-footer {
          text-align: center;
          padding: 32px 0;
          color: #999;
          font-size: 14px;
        }

        .demo-footer a {
          color: #5523B2;
          text-decoration: none;
        }

        .demo-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="demo-container">
        {/* Header */}
        <header className="demo-header">
          <h1>Aspora Design System</h1>
          <p>Interactive Component Demo</p>
        </header>

        {/* Button Section */}
        <Section title="Button">
          <DemoRow label="Primary">
            <Button variant="primary">Primary</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </DemoRow>
          <DemoRow label="Secondary">
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </DemoRow>
        </Section>

        {/* Toggle Section */}
        <Section title="Toggle">
          <DemoRow label="Large">
            <Toggle checked={toggle1} onChange={setToggle1} size="large" />
            <Toggle checked={toggle2} onChange={setToggle2} size="large" />
            <Toggle checked={false} disabled size="large" />
            <Toggle checked={true} disabled size="large" />
          </DemoRow>
          <DemoRow label="Regular">
            <Toggle checked={toggle1} onChange={setToggle1} size="regular" />
            <Toggle checked={toggle2} onChange={setToggle2} size="regular" />
            <Toggle checked={false} disabled size="regular" />
            <Toggle checked={true} disabled size="regular" />
          </DemoRow>
        </Section>

        {/* Radio Button Section */}
        <Section title="Radio Button">
          <DemoRow label="Large">
            <RadioButton
              checked={radioValue === 'option1'}
              value="option1"
              name="demo-large"
              onChange={setRadioValue}
              size="large"
            />
            <RadioButton
              checked={radioValue === 'option2'}
              value="option2"
              name="demo-large"
              onChange={setRadioValue}
              size="large"
            />
            <RadioButton checked={false} disabled size="large" name="disabled" value="d" />
          </DemoRow>
          <DemoRow label="Regular">
            <RadioButton
              checked={radioValue === 'option1'}
              value="option1"
              name="demo-regular"
              onChange={setRadioValue}
              size="regular"
            />
            <RadioButton
              checked={radioValue === 'option2'}
              value="option2"
              name="demo-regular"
              onChange={setRadioValue}
              size="regular"
            />
          </DemoRow>
          <DemoRow label="Small">
            <RadioButton
              checked={radioValue === 'option1'}
              value="option1"
              name="demo-small"
              onChange={setRadioValue}
              size="small"
            />
            <RadioButton
              checked={radioValue === 'option2'}
              value="option2"
              name="demo-small"
              onChange={setRadioValue}
              size="small"
            />
          </DemoRow>
        </Section>

        {/* Checkbox Section */}
        <Section title="Checkbox">
          <DemoRow label="Square">
            <Checkbox checked={checkbox1} onChange={setCheckbox1} size="large" variant="square" />
            <Checkbox checked={checkbox2} onChange={setCheckbox2} size="regular" variant="square" />
            <Checkbox checked={checkbox3} onChange={setCheckbox3} size="small" variant="square" />
            <Checkbox checked={false} disabled variant="square" />
            <Checkbox checked={true} disabled variant="square" />
          </DemoRow>
          <DemoRow label="Circular">
            <Checkbox checked={checkbox1} onChange={setCheckbox1} size="large" variant="circular" />
            <Checkbox checked={checkbox2} onChange={setCheckbox2} size="regular" variant="circular" />
            <Checkbox checked={checkbox3} onChange={setCheckbox3} size="small" variant="circular" />
            <Checkbox checked={false} disabled variant="circular" />
            <Checkbox checked={true} disabled variant="circular" />
          </DemoRow>
        </Section>

        {/* Input Field Section */}
        <Section title="Input Field">
          <DemoRow label="Default" fullWidth>
            <div className="demo-input-wrapper">
              <InputField
                value={inputValue}
                onChange={setInputValue}
                placeholder="Enter your name"
              />
            </div>
          </DemoRow>
          <DemoRow label="Error" fullWidth>
            <div className="demo-input-wrapper">
              <InputField
                value=""
                placeholder="Email address"
                errorMessage="Please enter a valid email"
              />
            </div>
          </DemoRow>
          <DemoRow label="Success" fullWidth>
            <div className="demo-input-wrapper">
              <InputField
                value="john@example.com"
                placeholder="Email address"
                successMessage="Email is valid!"
              />
            </div>
          </DemoRow>
          <DemoRow label="Disabled" fullWidth>
            <div className="demo-input-wrapper">
              <InputField
                value="Cannot edit"
                placeholder="Disabled input"
                disabled
              />
            </div>
          </DemoRow>
        </Section>

        {/* Search Bar Section */}
        <Section title="Search Bar">
          <DemoRow label="Default" fullWidth>
            <div className="demo-input-wrapper">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={(v) => alert(`Searching: ${v}`)}
                placeholder="Search something..."
              />
            </div>
          </DemoRow>
          <DemoRow label="Disabled" fullWidth>
            <div className="demo-input-wrapper">
              <SearchBar
                value=""
                placeholder="Search disabled"
                disabled
              />
            </div>
          </DemoRow>
        </Section>

        {/* Chip Section */}
        <Section title="Chip">
          <DemoRow label="Interactive">
            <Chip
              label="Investments"
              selected={selectedChips.includes('investments')}
              onClick={() => toggleChip('investments')}
              variant="chip"
            />
            <Chip
              label="Savings"
              selected={selectedChips.includes('savings')}
              onClick={() => toggleChip('savings')}
              variant="chip"
            />
            <Chip
              label="Budget"
              selected={selectedChips.includes('budget')}
              onClick={() => toggleChip('budget')}
              variant="chip"
            />
          </DemoRow>
          <DemoRow label="Sizes">
            <Chip label="Large" selected size="large" variant="chip" />
            <Chip label="Medium" selected size="medium" variant="chip" />
            <Chip label="Small" selected size="small" variant="chip" />
          </DemoRow>
        </Section>

        {/* Selector Section */}
        <Section title="Selector">
          <DemoRow label="Interactive">
            <Selector
              label="Monthly"
              selected={selectedPeriod === 'monthly'}
              onClick={() => setSelectedPeriod('monthly')}
            />
            <Selector
              label="Yearly"
              selected={selectedPeriod === 'yearly'}
              onClick={() => setSelectedPeriod('yearly')}
            />
            <Selector
              label="Lifetime"
              selected={selectedPeriod === 'lifetime'}
              onClick={() => setSelectedPeriod('lifetime')}
            />
          </DemoRow>
          <DemoRow label="Sizes">
            <Selector label="Large" selected size="large" />
            <Selector label="Medium" selected size="medium" />
            <Selector label="Small" selected size="small" />
          </DemoRow>
          <DemoRow label="Disabled">
            <Selector label="Disabled" disabled />
            <Selector label="Selected" selected disabled />
          </DemoRow>
        </Section>

        {/* Slider Section */}
        <Section title="Slider">
          <DemoRow label="Single" fullWidth>
            <div className="demo-slider-wrapper">
              <div className="demo-slider-value">Value: {sliderValue}</div>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                type="single"
              />
            </div>
          </DemoRow>
          <DemoRow label="Range" fullWidth>
            <div className="demo-slider-wrapper">
              <div className="demo-slider-value">Range: {rangeValue[0]} - {rangeValue[1]}</div>
              <Slider
                rangeValue={rangeValue}
                onRangeChange={setRangeValue}
                min={0}
                max={100}
                type="range"
              />
            </div>
          </DemoRow>
          <DemoRow label="Disabled" fullWidth>
            <div className="demo-slider-wrapper">
              <Slider value={50} disabled type="single" />
            </div>
          </DemoRow>
        </Section>

        {/* Footer */}
        <footer className="demo-footer">
          <p>Aspora Design System &copy; 2025</p>
          <p style={{ marginTop: 8 }}>
            <a
              href="https://github.com/sudhanshuverma550/aspora-design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default ComponentDemo;
