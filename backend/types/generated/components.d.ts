import type { Schema, Attribute } from '@strapi/strapi';

export interface ColorColor extends Schema.Component {
  collectionName: 'components_color_colors';
  info: {
    displayName: 'color';
    description: '';
  };
  attributes: {
    colorName: Attribute.String & Attribute.Required;
    colorId: Attribute.String & Attribute.Required;
    colorImg: Attribute.String;
  };
}

export interface ImgArticle extends Schema.Component {
  collectionName: 'components_img_articles';
  info: {
    displayName: 'article';
  };
  attributes: {
    asdas: Attribute.String;
  };
}

export interface NoneColorName extends Schema.Component {
  collectionName: 'components_none_color_names';
  info: {
    displayName: 'colorName';
  };
  attributes: {
    colorName: Attribute.String;
    colorId: Attribute.String;
    colorImg: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'color.color': ColorColor;
      'img.article': ImgArticle;
      'none.color-name': NoneColorName;
    }
  }
}
