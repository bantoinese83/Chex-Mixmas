import React from 'react';
import { NutritionFacts } from '../../types';

interface NutritionFactsProps {
  nutrition: NutritionFacts;
}

interface NutrientRowProps {
  label: string;
  value?: string;
  bold?: boolean;
  indent?: boolean;
  last?: boolean;
}

const NutrientRow: React.FC<NutrientRowProps> = ({ label, value, bold, indent, last }) => (
  <div className={`flex justify-between py-1 border-slate-300 ${last ? '' : 'border-b'}`}>
    <span className={`${indent ? 'pl-4' : ''} ${bold ? 'font-bold' : ''}`}>{label}</span>
    <span>{value || '0g'}</span>
  </div>
);

export const NutritionFactsComponent: React.FC<NutritionFactsProps> = ({ nutrition }) => {
  return (
    <div className="mt-12 border-2 border-slate-900 p-4 bg-white shadow-sm print:shadow-none print:break-inside-avoid">
      <h3 className="text-3xl font-black text-slate-900 border-b-8 border-slate-900 leading-none pb-1 mb-1">
        Nutrition Facts
      </h3>
      <p className="text-sm font-bold border-b-4 border-slate-900 py-1 mb-2 flex justify-between">
        <span>Serving Size</span>
        <span>1/2 cup</span>
      </p>

      <div className="flex justify-between items-end border-b-4 border-slate-900 pb-2 mb-2">
        <div>
          <span className="font-black text-3xl">Calories</span>
        </div>
        <span className="font-black text-4xl">{nutrition.calories}</span>
      </div>

      <div className="text-sm text-slate-800">
        <NutrientRow label="Total Fat" value={nutrition.totalFat} bold />
        <NutrientRow label="Saturated Fat" value={nutrition.saturatedFat} indent />
        <NutrientRow label="Trans Fat" value={nutrition.transFat} indent />
        <NutrientRow label="Cholesterol" value={nutrition.cholesterol} bold />
        <NutrientRow label="Sodium" value={nutrition.sodium} bold />
        <NutrientRow label="Total Carbohydrate" value={nutrition.totalCarbohydrate} bold />
        <NutrientRow label="Dietary Fiber" value={nutrition.dietaryFiber} indent />
        <NutrientRow label="Total Sugars" value={nutrition.totalSugars} indent />
        <NutrientRow label="Protein" value={nutrition.protein} bold last />

        <div className="border-t-8 border-slate-900 mt-2 pt-2">
          <NutrientRow label="Vitamin D" value={nutrition.vitaminD} />
          <NutrientRow label="Calcium" value={nutrition.calcium} />
          <NutrientRow label="Iron" value={nutrition.iron} />
          <NutrientRow label="Potassium" value={nutrition.potassium} last />
        </div>
      </div>
      <p className="text-[10px] text-slate-500 mt-2 leading-tight">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a
        daily diet. 2,000 calories a day is used for general nutrition advice.
      </p>
    </div>
  );
};
