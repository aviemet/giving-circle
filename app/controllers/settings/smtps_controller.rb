module Admin
  class Settings::SmtpsController < Settings::CircleSettingsController
    expose :smtps, -> { circle.smtps }
    expose :smtp, id: -> { params[:id] }, scope: -> { circle.smtps }

    strong_params :smtp, permit: [:name, :host, :domain, :port, :security, :username, :password, :address, :notes]

    # @route GET /settings/:circle_slug/mail (settings_smtps)
    def index
      render inertia: "Settings/Mail/Index", props: {
        smtps: -> { smtps.render(:index) },
      }
    end

    # @route GET /settings/:circle_slug/mail/:id (settings_smtp)
    def show
      render inertia: "Settings/Mail/Show", props: {
        smtp: smtp.render(:show),
      }
    end

    # @route GET /settings/:circle_slug/mail/new (new_settings_smtp)
    def new
      render inertia: "Settings/Mail/New", props: {
        smtp: Smtp.new(security: :tls).render(:form_data),
      }
    end

    # @route GET /settings/:circle_slug/mail/:id/edit (edit_settings_smtp)
    def edit
      render inertia: "Settings/Mail/Edit", props: {
        smtp: smtp.render(:form_data),
      }
    end

    # @route POST /settings/:circle_slug/mail (settings_smtps)
    def create
      smtp.circle = circle

      if smtp.save
        redirect_to settings_smtp_path(smtp, circle_slug: circle.slug), notice: t("settings.mail.notices.created")
      else
        redirect_to new_settings_smtp_path(circle_slug: circle.slug), inertia: { errors: smtp.errors }
      end
    end

    # @route PATCH /settings/:circle_slug/mail/:id (settings_smtp)
    # @route PUT /settings/:circle_slug/mail/:id (settings_smtp)
    def update
      if smtp.update(smtp_params)
        redirect_to settings_smtp_path(smtp, circle_slug: circle.slug), notice: t("settings.mail.notices.updated")
      else
        redirect_to edit_settings_smtp_path(smtp, circle_slug: circle.slug), inertia: { errors: smtp.errors }
      end
    end

    # @route DELETE /settings/:circle_slug/mail/:id (settings_smtp)
    def destroy
      smtp.destroy
      redirect_to settings_smtps_path(circle_slug: circle.slug), notice: t("settings.mail.notices.deleted")
    end
  end
end
