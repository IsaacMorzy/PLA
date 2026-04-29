"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    image?: string;
    goal: number;
    raised: number;
    category?: string;
    location?: string;
    status?: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
}

const fallbackImage = "/images/campaign-placeholder.jpg";

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const goal = campaign.metadata?.goal || 1;
  const raised = campaign.metadata?.raised || 0;
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  const category = campaign.metadata?.category || "community";
  const location = campaign.metadata?.location || "Africa";
  const status = campaign.metadata?.status || "active";

  const imageSrc = imageError ? fallbackImage : (campaign.metadata?.image || fallbackImage);

  return (
    <Link 
      href={`/campaign/${campaign.slug}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={imageSrc}
          alt={campaign.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
            {category}
          </span>
          <span className={`px-2 py-1 rounded-full ${
            status === "active" 
              ? "bg-green-500/10 text-green-600" 
              : "bg-muted text-muted-foreground"
          }`}>
            {status === "active" ? "Active" : "Completed"}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {campaign.metadata?.description || "No description available"}
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-medium">{percentage}%</span>
            <span className="text-muted-foreground">
              {raised} / {goal} SOL
            </span>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-xs text-muted-foreground">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
      </div>
    </Link>
  );
}