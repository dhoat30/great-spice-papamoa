'use client';
import React,  { useEffect } from 'react';

export default function ReservationWidget() {
    return (
        <div>
          <div id="rd-widget-frame" style={{ maxWidth: 600, margin: 'auto' }}></div>
          <input 
            id="rdwidgeturl" 
            name="rdwidgeturl" 
            value="https://booking.resdiary.com/widget/Standard/GreatSpicePapamoa/9171?includeJquery=false" 
            type="hidden"
          />
          <script 
            src="https://booking.resdiary.com/bundles/WidgetV2Loader.js" 
            strategy="afterInteractive" 
          />
        </div>
      );
}
