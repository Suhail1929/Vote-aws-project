<template>
    <div class="container py-5 text-center">
        <div>
            <RouterLink to = "/create-candidat" class="btn btn-primary mb-4">Ajouter un candidat</RouterLink>
        </div>
        <h1>Liste des candidats</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <table border="1" class="table">
                        <thead>
                            <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Votes</th>
                            <th>Date de candidature</th>
                            <th>Voir plus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="candidat in candidats" :key="candidat.id">
                            <td>{{ candidat.Name }}</td>
                            <td>{{ candidat.Description }}</td>
                            <td>{{ candidat.votes }}</td>
                            <td>{{ formatDate(candidat.Timestamp) }}</td>
                            <td>
                                <RouterLink :to="{ name: 'candidat-details', params: { id: candidat.id } }" class="btn btn-primary">Voir</RouterLink>
                                <!-- <button @click="deleteCandidat(candidat.id)" class="btn btn-danger">Supprimer</button> -->
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
  </template>
  
  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        candidats: [], // Liste des candidats
        loading: false, // Indique si les données sont en cours de chargement
        error: null, // Message d'erreur en cas de problème
      };
    },
    methods: {
      async fetchCandidats() {
        this.loading = true;
        this.error = null;
  
        try {
          const response = await axios.get(
            "https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/candidats"
          );
  
          // L'API retourne les données dans le champ `body`, donc on doit les parser
          this.candidats = JSON.parse(response.data.body);
        } catch (err) {
          this.error = "Erreur lors de la récupération des candidats.";
          console.error(err);
        } finally {
          this.loading = false;
        }
      },

      async deleteCandidat(id) {
        try {
            const playload = {
                id: id
            }

          await axios.delete(
            `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/candidat`, playload
          );
          this.candidats = this.candidats.filter((candidat) => candidat.id !== id);
          alert("Candidat supprimé avec succès !");
        } catch (err) {
          this.error = "Erreur lors de la suppression du candidat.";
          console.error(err);
        }
      },
  
      formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
      },
    },
    mounted() {
      // Récupère les candidats au montage du composant
      this.fetchCandidats();
    },
  };
  </script>


  