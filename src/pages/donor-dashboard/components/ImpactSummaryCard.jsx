import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactSummaryCard = ({ totalDonations, livesHelped, badges }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold mb-2">Your Impact</h2>
          <p className="text-primary-foreground/80 font-body">Making a difference in lives</p>
        </div>
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-heading font-bold mb-1">{totalDonations}</div>
          <div className="text-primary-foreground/80 font-body text-sm">Total Donations</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-heading font-bold mb-1">{livesHelped}</div>
          <div className="text-primary-foreground/80 font-body text-sm">Lives Helped</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-heading font-bold mb-1">{badges}</div>
          <div className="text-primary-foreground/80 font-body text-sm">Recognition Badges</div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSummaryCard;