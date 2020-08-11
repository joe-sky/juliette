import { ClassProvider, InjectionToken, Type } from '@angular/core';
import { Observable } from "rxjs";

export const fromClassesWithEffectsToClassProviders = (
  injectionToken: InjectionToken<any>,
  classesWithEffects: Type<any>[],
): ClassProvider[] =>
  classesWithEffects.map(classWithEffects => ({
    provide: injectionToken,
    useClass: classWithEffects,
    multi: true,
  }));

export const fromObjectsWithEffectsToEffects = (objectsWithEffects: any[]): Observable<any>[] =>
  objectsWithEffects.reduce((acc, objectWithEffects) => {
    const effectsFromCurrentObject = Object.getOwnPropertyNames(objectWithEffects)
      .filter(prop => objectWithEffects[prop] instanceof Observable)
      .map(prop => objectWithEffects[prop]);
    return [...acc, ...effectsFromCurrentObject];
  }, []);
