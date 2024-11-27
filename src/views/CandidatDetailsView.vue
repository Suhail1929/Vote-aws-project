<template>
    <div class="container py-5">
        <div class="row">
        <div class="col-md-12">
            <h1>Détails du candidat</h1>
            <div v-if="loading" class="alert alert-info" role="alert">
            Chargement en cours...
            </div>
            <div v-else-if="error" class="alert alert-danger" role="alert">
            {{ error }}
            </div>
            <div v-else>
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">{{ candidat.Name }}</h5>
                    <p class="card-text">{{ candidat.Description }}</p>
                    <p class="card-text">Votes : {{ votes }}</p>
                    <button @click="deleteCandidat(candidat.id)" class="btn btn-danger">Supprimer</button>
                    </div>
                </div>
            </div>
            <div v-if="message" class="alert alert-info" role="alert">{{ message }}</div>
            <router-link to="/candidat" class="btn btn-primary mt-3">Retour</router-link>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
        candidat: {}, // Détails du candidat
        votes: 0, // Nombre de votes
        loading: false, // Indique si les données sont en cours de chargement
        error: null, // Message d'erreur en cas de problème
        message: null, // Message de succès
        };
    },
    methods: {
        async fetchCandidat() {
        this.loading = true;
        this.error = null;

        try {
            const response = await axios.get(
            `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/candidat?id=${this.$route.params.id}`
            );

            this.candidat = JSON.parse(response.data.body.body);
        } catch (error) {
            this.error = `Erreur : ${error.response?.data?.message || error.message}`;
            console.error("Erreur lors de la requête :", error);
        } finally {
            this.loading = false;
        }
        },

        async Voteparcandidat(id) {
        try {
            const response =  await axios.get(
            `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/votes/candidat?id=${id}`
            );
            this.votes = JSON.parse(response.data.body.body).TotalVotes;
        } catch (error) {
            alert(`Erreur : ${error.response?.data?.message || error.message}`);
            console.error("Erreur lors de la requête :", error);
        }
        },
        async Voterpourcandidat(candidatId) {

            const userId = Math.floor(Math.random() * 100);

            try {
                const response = await axios.post(
                `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/votes`,
                {
                    userId: userId, candidateId: candidatId
                }
                );
                this.message = "Vote enregistré avec succès !";
                this.Voteparcandidat(candidatId);
                //transformer le button en annuler vote
                console.log("Réponse de l'API :", response.data);
                    
            } catch (error) {
                alert(`Erreur : ${error.response?.data?.message || error.message}`);
                console.error("Erreur lors de la requête :", error);
            }
        
        },

        async deleteCandidat(id) {
            try {
                const response = await axios.delete(
                `https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/candidat`,
                {
                    data: { id: id }, // Passer les données dans "data"
                }
                );

                this.$router.push("/candidat");
            } catch (err) {
            this.error = "Erreur lors de la suppression du candidat.";
            console.error(err);
            }
        },
        formatDate(date) {
        return new Date(date).toLocaleDateString();
        },
    },
    mounted() {
        this.fetchCandidat();
        this.Voteparcandidat(this.$route.params.id);
    },
};

</script>