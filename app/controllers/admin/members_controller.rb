module Admin
  class MembersController < AdminController
    include Searchable

    expose :members, -> { search(Member.includes_associated, sortable_fields) }
    expose :member, scope: -> { members }, find: ->(id, scope) { scope.includes_associated.find(id) }

    # @route GET /admin/themes/:theme_slug/members (theme_members)
    # @route GET /admin/circles/:circle_slug/members (circle_members)
    def index
      authorize members
      render inertia: "Members/Index", props: {
        members: -> { members.render }
      }
    end

    # @route GET /admin/members/:slug (member)
    # @route GET /admin/members/:id
    def show
      authorize member
      render inertia: "Members/Show", props: {
        member: -> { member.render }
      }
    end

    # @route GET /admin/themes/:theme_slug/members/new (new_theme_member)
    # @route GET /admin/circles/:circle_slug/members/new (new_circle_member)
    def new
      authorize Member.new
      render inertia: "Members/New", props: {
        member: Member.new.render
      }
    end

    # @route GET /admin/members/:slug/edit (edit_member)
    # @route GET /admin/members/:id/edit
    def edit
      authorize member
      render inertia: "Members/Edit", props: {
        member: member.render
      }
    end

    # @route POST /admin/themes/:theme_slug/members (theme_members)
    def create
      authorize Member.new
      if member.save
        redirect_to [:admin, member], notice: "Member was successfully created."
      else
        redirect_to [:admin, new_member_path], inertia: { errors: member.errors }
      end
    end

    # @route PATCH /admin/members/:slug (member)
    # @route PUT /admin/members/:slug (member)
    def update
      authorize member
      if member.update(member_params)
        redirect_to [:admin, member], notice: "Member was successfully updated."
      else
        redirect_to [:admin, edit_member_path], inertia: { errors: member.errors }
      end
    end

    # @route DELETE /admin/themes/:theme_slug/members (theme_members)
    # @route DELETE /admin/members/:slug (member)
    # @route DELETE /admin/members/:id
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
