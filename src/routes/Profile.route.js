import ProfileController from "../controllers/Profile.controller.js";
import AuthorizationMiddleware from "../middlewares/Authorization.middleware.js";

class ProfileRoute {
    constructor(Server) {
        this.Server = Server;
        this.API = this.Server.API;
        this.routePrefix = "/profile";
        this.ProfileController = new ProfileController(this.Server);
        this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);

        this.route();
    }

    route() {

        this.API.get(this.routePrefix + "/get-aktivitas", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.getAktivitas(req, res));

        this.API.get(this.routePrefix + "/get-tujuan-diet", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.getTujuanDiet(req, res));

        this.API.get(this.routePrefix + "/get-bahan-makanan", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.getBahanMakanan(req, res));

        this.API.post(this.routePrefix + "/input", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.input(req, res));

        this.API.get(this.routePrefix + "/get", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.get(req, res));

        this.API.put(this.routePrefix + "/update", this.AuthorizationMiddleware.check(),
            (req, res) => this.ProfileController.update(req, res));



        // this.API.get(this.routePrefix + "/get-preferensi-diet", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.getPreferensiDiet(req, res));

        // this.API.post(this.routePrefix + "/input-preferensi-diet-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.inputPreferensiDietDetail(req, res));

        // this.API.get(this.routePrefix + "/get-preferensi-diet-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.getPreferensiDietDetail(req, res));

        // this.API.put(this.routePrefix + "/update-preferensi-diet-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.updatePreferensiDietDetail(req, res));


        // this.API.post(this.routePrefix + "/input-bahan-makanan-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.inputBahanMakananDetail(req, res));

        // this.API.get(this.routePrefix + "/get-bahan-makanan-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.getBahanMakananDetail(req, res));

        // this.API.put(this.routePrefix + "/update-bahan-makanan-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.updateBahanMakananDetail(req, res));

        // this.API.get(this.routePrefix + "/get-level-memasak", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.getLevelMemasak(req, res));

        // this.API.get(this.routePrefix + "/get-waktu-memasak", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.getWaktuMemasak(req, res));

        // this.API.post(this.routePrefix + "/input-waktu-memasak-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.inputWaktuMemasakDetail(req, res));

        // this.API.get(this.routePrefix + "/get-waktu-memasak-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.getWaktuMemasakDetail(req, res));

        // this.API.put(this.routePrefix + "/update-waktu-memasak-detail", this.AuthorizationMiddleware.check(),
        //     (req, res) => this.ProfileController.updateWaktuMemasakDetail(req, res));

    }
}

export default ProfileRoute;