export interface BCMasterData {
  bcCode: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  mobile?: string;
  altMobile?: string;
  village?: string;
  taluka?: string;
  district?: string;
  pincode?: string;
}

export interface DispatchFormData {
  ticketId?: string;
  bcCode: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  mobile?: string;
  altMobile?: string;
  village?: string;
  taluka?: string;
  district?: string;
  pincode?: string;
  dispatchBy?: string;
  dispatchWith?: string;
  dispatchNumber?: string;
  dispatchLink?: string;
  estimateDelivery?: string;
  itemNames?: string;
}