import couchdb

couch = couchdb.Server()
db = couch['alignments']

retrieve_mapfn = """function(doc) {
  if (doc.type == "alignment" && doc.src_lang == "English" && doc.tgt_lang == "Spanish") {
    emit(doc.src, doc.maps);
  }
}"""

design = { 'views': {
           'aligned_by_src': {
              'map': retrieve_mapfn
            }
         } }
db["_design/all_alignments"] = design
