import type { Schema, Attribute } from '@strapi/strapi';

export interface ColorColors extends Schema.Component {
  collectionName: 'components_color_colors';
  info: {
    displayName: 'colors';
  };
  attributes: {
    colorName: Attribute.String & Attribute.Required;
    colorId: Attribute.String & Attribute.Required;
    colorImg: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'color.colors': ColorColors;
    }
  }
}
