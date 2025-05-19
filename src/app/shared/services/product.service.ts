
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  docData,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection;

  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'Products');
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }


  getProductById(id: string): Observable<Product> {
    const productDoc = doc(this.firestore, `Products/${id}`);
    return docData(productDoc, { idField: 'id' }) as Observable<Product>;
  }


  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const docRef = await addDoc(this.productsCollection, product);
    return { id: docRef.id, ...product };
  }


  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const productDoc = doc(this.firestore, `Products/${id}`);
    await updateDoc(productDoc, product);
  }


  async deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.firestore, `Products/${id}`);
    await deleteDoc(productDoc);
  }
}