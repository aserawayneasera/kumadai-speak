export type MainTab = 'home' | 'speak' | 'staff' | 'saved' | 'more';

export interface AppRoute {
  tab: MainTab;
  categoryId?: string;
  deckId?: string;
  vocabGroupId?: string;
  roleFilter?: 'all' | 'student' | 'staff' | 'info';
  search?: string;
  morePanel?: 'custom' | 'builder' | 'words' | 'settings' | 'help' | 'about';
  savedKind?: 'favorites' | 'recent' | 'custom';
}

