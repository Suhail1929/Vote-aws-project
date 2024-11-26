<template>
    <div class="row col-md-8 offset-md-2">
    <h1>Créer un candidat</h1>
    <form @submit.prevent="createCandidat">
      <div class="mb-3">
        <label for="name" class="form-label">Nom:</label>
        <input v-model="name" class="form-control" id="name" type="text" required />
        <div class="form-text">Le nom complet du candidat</div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea v-model="description" class="form-control" id="description" required></textarea>
        <div class="form-text">Description du candidat</div>
      </div>
      <div v-if="message" class="alert alert-info" role="alert">{{ message }}</div>
      <button type="submit" class="btn btn-primary">Créer</button>
  </form>
    <div class="row col-md-4 offset-md-4">
      <RouterLink to="/candidat" class="btn btn-secondary mt-3">Retour</RouterLink>
    </div>

  </div>
</template>
  
<script>
    import axios from "axios";

    export default {
    data() {
        return {
        name: "",
        description: "",
        message: null,
        };
    },
    methods: {
        async createCandidat() {
        const payload = {
            name: this.name,
            description: this.description,
        };

        let config = {
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const response = await axios.post(
            "https://ndlbzknqd9.execute-api.eu-north-1.amazonaws.com/test/candidat",
            payload, config
            );

            this.message = "Candidat créé avec succès !";
            console.log("Réponse de l'API :", response.data);
        } catch (error) {
            this.message = `Erreur : ${error.response?.data?.message || error.message}`;
            console.error("Erreur lors de la requête :", error);
        }
        },
    },
    };
</script>
  