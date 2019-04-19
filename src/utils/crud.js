import * as QL from "graphql-sync-multi-platform/graphql_cache.core";

export const findMany = (options = {collection:'', condition:'', fields: '',}) => {
  //console.log("f-many:",options);
  return QL.find_many(options.collection,options.condition,options.fields).then(res => {
    //console.log("many-res:", res);
    return res;
  });
};

export const insert = (options = {collection:'', condition:'', fields: '',}) => {
  return QL.insert(options.collection,options.condition,options.fields).then(res => {
    return res;
  });
};

export const update = (options = {collection:'', condition:'', fields: '',}) => {
  return QL.update(options.collection,options.condition,options.fields).then(res => {
    return res;
  });
};

export const remove = (options = {collection:'', condition:''}) => {
  return QL.remove(options.collection,options.condition).then(res => {
    return res;
  });
};