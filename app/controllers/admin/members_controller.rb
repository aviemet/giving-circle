module Admin
  class MembersController < AdminController
    include Searchable

    expose :members, -> { search(members.includes_associated, sortable_fields) }
    expose :member, scope: ->{ members }, find: ->(id, scope){ scope.includes_associated.find(id) }

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/members (admin_circle_theme_members)
    # @route GET /admin/circles/:circle_slug/members (admin_circle_members)
    def index
      authorize members
      render inertia: "Members/Index", props: {
        members: -> { members.render }
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/members/:id (admin_circle_theme_member)
    # @route GET /admin/circles/:circle_slug/members/:id (admin_circle_member)
    def show
      authorize member
      render inertia: "Members/Show", props: {
        member: -> { member.render }
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/members/new (new_admin_circle_theme_member)
    # @route GET /admin/circles/:circle_slug/members/new (new_admin_circle_member)
    def new
      authorize Member.new
      render inertia: "Members/New", props: {
        member: Member.new.render
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/members/:id/edit (edit_admin_circle_theme_member)
    # @route GET /admin/circles/:circle_slug/members/:id/edit (edit_admin_circle_member)
    def edit
      authorize member
      render inertia: "Members/Edit", props: {
        member: member.render
      }
    end

    # @route POST /admin/circles/:circle_slug/themes/:theme_slug/members (admin_circle_theme_members)
    def create
      authorize Member.new
      if member.save
        redirect_to [:admin, member], notice: "Member was successfully created."
      else
        redirect_to [:admin, new_member_path], inertia: { errors: member.errors }
      end
    end

    # @route PATCH /admin/circles/:circle_slug/themes/:theme_slug/members/:id (admin_circle_theme_member)
    # @route PUT /admin/circles/:circle_slug/themes/:theme_slug/members/:id (admin_circle_theme_member)
    def update
      authorize member
      if member.update(member_params)
        redirect_to [:admin, member], notice: "Member was successfully updated."
      else
        redirect_to [:admin, edit_member_path], inertia: { errors: member.errors }
      end
    end

    # @route DELETE /admin/circles/:circle_slug/themes/:theme_slug/members (admin_circle_theme_members)
    # @route DELETE /admin/circles/:circle_slug/themes/:theme_slug/members/:id (admin_circle_theme_member)
    # @route DELETE /admin/circles/:circle_slug/members/:id (admin_circle_member)
    def destroy
      authorize member
      member.destroy
      redirect_to [:admin, members_url], notice: "Member was successfully destroyed."
    end

    private

    def sortable_fields
      %w(first_name last_name number).freeze
    end

    def member_params
      params.require(:member).permit(:first_name, :last_name, :number)
    end
  end
end
