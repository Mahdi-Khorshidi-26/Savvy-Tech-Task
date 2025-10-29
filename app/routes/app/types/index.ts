export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: Date | null;
  notes: string | null;
  pantrySelfId: string;
}

export interface PantrySelf {
  id: string;
  name: string;
  type: string;
  order: number;
  items: PantryItem[];
}

export interface OptimisticShelf extends PantrySelf {
  isOptimistic?: boolean;
}
