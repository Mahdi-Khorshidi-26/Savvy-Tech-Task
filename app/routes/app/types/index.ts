export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: Date | null;
  notes: string | null;
  pantrySelfId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PantrySelf {
  id: string;
  name: string;
  type: string;
  order: number;
  items: PantryItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OptimisticShelf extends PantrySelf {
  isOptimistic?: boolean;
}
