module Admin
  class Settings::SmtpsController < ApplicationController
    expose :circle, id: -> { params[:circle_slug] }, scope: -> { current_user.circles }, find_by: :slug

    expose :smtps, -> { circle.smtps }
    expose :smtp, id: -> { params[:id] }, scope: -> { circle.smtps }

    strong_params :smtp, permit: [:name, :host, :domain, :port, :security, :username, :password, :address, :notes]

    before_action :ensure_circle!

    # @route GET /settings/mail (settings_smtps)
    def index
      render inertia: "Settings/Mail/Index", props: {
        smtps: -> { smtps.render(:index) },
      }
    end

    # @route GET /settings/mail/:id (settings_smtp)
    def show
      render inertia: "Settings/Mail/Show", props: {
        smtp: smtp.render(:show),
      }
    end

    # @route GET /settings/mail/new (new_settings_smtp)
    def new
      render inertia: "Settings/Mail/New", props: {
        smtp: Smtp.new(security: :tls).render(:form_data),
      }
    end

    # @route GET /settings/mail/:id/edit (edit_settings_smtp)
    def edit
      render inertia: "Settings/Mail/Edit", props: {
        smtp: smtp.render(:form_data),
      }
    end

    # @route POST /settings/mail (settings_smtps)
    def create
      smtp.circle = circle

      if smtp.save
        redirect_to settings_smtp_path(smtp, circle_slug: circle.slug), notice: "Mail account successfully created"
      else
        redirect_to new_settings_smtp_path(circle_slug: circle.slug), inertia: { errors: smtp.errors }
      end
    end

    # @route PATCH /settings/mail/:id (settings_smtp)
    # @route PUT /settings/mail/:id (settings_smtp)
    def update
      if smtp.update(smtp_params)
        redirect_to settings_smtp_path(smtp, circle_slug: circle.slug), notice: "Mail account successfully updated"
      else
        redirect_to edit_settings_smtp_path(smtp, circle_slug: circle.slug), inertia: { errors: smtp.errors }
      end
    end

    # @route DELETE /settings/mail/:id (settings_smtp)
    def destroy
      smtp.destroy
      redirect_to settings_smtps_path(circle_slug: circle.slug), notice: "Mail account successfully deleted"
    end

    private

    def ensure_circle!
      return if params[:circle_slug].present?

      circle_slug = current_user.circles.pick(:slug)
      if circle_slug
        redirect_to settings_smtps_path(circle_slug: circle_slug)
      else
        redirect_to circles_path, notice: "You have not been granted access to a Giving Circle"
      end
    end
  end
end
