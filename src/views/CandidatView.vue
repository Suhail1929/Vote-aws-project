<template>
    <div class="container text-center">
        <div>
            <RouterLink to = "/create-candidat" class="btn btn-primary mb-4">Ajouter un candidat</RouterLink>
        </div>
        <div class="container">
          <div class="alert alert-warning" role="alert">
            {{ message_gagnant }}
          </div>
          <div class="row" style="border-radius: 10px;">
            <div class="col-md-6 d-flex align-items-center justify-content-center" style="width: 40%;">
              <canvas id="votePieChart">

              </canvas>
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-center">
              <canvas id="voteBarChart"></canvas>
            </div>
          </div>
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
                            <th>Voter pour</th>
                            <th>Voir plus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="candidat in candidats" :key="candidat.id">
                              <td>{{ candidat.Name }}</td>
                              <td>{{ candidat.Description }}</td>
                              <td> <span class="badge bg-success px-3 fs-5"
                                >{{ votes[candidat.id] || 0 }}</span></td>
                              <td>{{ formatDate(candidat.Timestamp) }}</td>
                              <td>
                                  <button @click="Voterpourcandidat(candidat.id)" class="btn btn-success">Voter</button>
                              </td>
                              <td>
                                  <RouterLink :to="{ name: 'candidat-details', params: { id: candidat.id } }" class="btn btn-primary">Voir</RouterLink>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="message" class="alert alert-info" role="alert">{{ message }}</div>
                </div>
            </div>
        </div>
    </div>
    
  </template>
  
  <script>
  import axios from "axios";
  import Chart from 'chart.js/auto';


  export default {
    data() {
      return {
        candidats: [], // Liste des candidats
        loading: false, // Indique si les données sont en cours de chargement
        error: null, // Message d'erreur en cas de problème
        votes: {}, // Nombre de votes
        pieChart: null, // Référence au graphique circulaire
        barChart: null, // Référence au graphique en barres
        message_gagnant: null, // Message indiquant le gagnant actuel
      };
    },
    methods: {
      async fetchCandidats() {
        this.loading = true;
        this.error = null;
        this.votes = {};
        try {
          const response = await axios.get(
            "https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/candidats"
          );
  
          // L'API retourne les données dans le champ `body`, donc on doit les parser
          this.candidats = JSON.parse(response.data.body);
          this.candidats.forEach((candidat) => {
            this.Voteparcandidat(candidat.id);
          });

           // Générer les graphiques après avoir chargé les données
          this.generateCharts();
        } catch (err) {
          this.error = "Erreur lors de la récupération des candidats.";
          console.error(err);
        } finally {
          this.loading = false;
        }
      },
      
      async Voterpourcandidat(candidatId) {

        const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        try {
            const response = await axios.post(
            `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/votes`,
            {
                userId: userId, candidateId: candidatId
            }
            );
            this.message = "Vote enregistré avec succès !";
            this.Voteparcandidat(candidatId);
            
            console.log("Réponse de l'API :", response.data);
                
        } catch (error) {
            alert(`Erreur : ${error.response?.data?.message || error.message}`);
            console.error("Erreur lors de la requête :", error);
        }

      },

        async Voteparcandidat(id) {
          try {
              const response =  await axios.get(
              `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/votes/candidat?id=${id}`
              );
              this.votes[id] = JSON.parse(response.data.body.body).TotalVotes;
          } catch (error) {
              alert(`Erreur : ${error.response?.data?.message || error.message}`);
              console.error("Erreur lors de la requête :", error);
          }
        },
    
        formatDate(timestamp) {
          const date = new Date(timestamp);
          return date.toLocaleString();
        },
        generateCharts() {

          const labels = this.candidats.map((candidat) => candidat.Name);
          const voteData = this.candidats.map((candidat) => candidat.votes);

          console.log(this.candidats);

          // Déterminer le gagnant
          const maxVotes = Math.max(...voteData);
          const winnerIndex = voteData.indexOf(maxVotes);
          this.message_gagnant = `Le gagnant actuel est ${labels[winnerIndex]} avec ${maxVotes} votes.`;

          // Diagramme circulaire (Pie chart)
          const pieCtx = document.getElementById("votePieChart").getContext("2d");
          this.pieChart = new Chart(pieCtx, {
            type: "pie",
            data: {
              labels,
              datasets: [
                {
                  label: "Répartition des votes",
                  data: voteData,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                },
              ],
            },
          });

          // Diagramme en barres (Bar chart)
          const barCtx = document.getElementById("voteBarChart").getContext("2d");
          this.barChart = new Chart(barCtx, {
            type: "bar",
            data: {
              labels,
              datasets: [
                {
                  label: "Nombre de votes",
                  data: voteData,
                  backgroundColor: "#36A2EB",
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        },
      },

    mounted() {
      // Récupère les candidats au montage du composant
      this.fetchCandidats();
    
    },
  };
  </script>


  