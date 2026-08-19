import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model RecruiterProfile
 *
 */
export type RecruiterProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$RecruiterProfilePayload>;
export type AggregateRecruiterProfile = {
    _count: RecruiterProfileCountAggregateOutputType | null;
    _min: RecruiterProfileMinAggregateOutputType | null;
    _max: RecruiterProfileMaxAggregateOutputType | null;
};
export type RecruiterProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    companyName: string | null;
    companyRole: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecruiterProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    companyName: string | null;
    companyRole: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecruiterProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    companyName: number;
    companyRole: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RecruiterProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    companyName?: true;
    companyRole?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecruiterProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    companyName?: true;
    companyRole?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecruiterProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    companyName?: true;
    companyRole?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RecruiterProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterProfile to aggregate.
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: Prisma.RecruiterProfileOrderByWithRelationInput | Prisma.RecruiterProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RecruiterProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RecruiterProfiles
    **/
    _count?: true | RecruiterProfileCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RecruiterProfileMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RecruiterProfileMaxAggregateInputType;
};
export type GetRecruiterProfileAggregateType<T extends RecruiterProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateRecruiterProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecruiterProfile[P]> : Prisma.GetScalarType<T[P], AggregateRecruiterProfile[P]>;
};
export type RecruiterProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecruiterProfileWhereInput;
    orderBy?: Prisma.RecruiterProfileOrderByWithAggregationInput | Prisma.RecruiterProfileOrderByWithAggregationInput[];
    by: Prisma.RecruiterProfileScalarFieldEnum[] | Prisma.RecruiterProfileScalarFieldEnum;
    having?: Prisma.RecruiterProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecruiterProfileCountAggregateInputType | true;
    _min?: RecruiterProfileMinAggregateInputType;
    _max?: RecruiterProfileMaxAggregateInputType;
};
export type RecruiterProfileGroupByOutputType = {
    id: string;
    userId: string;
    companyName: string;
    companyRole: string;
    createdAt: Date;
    updatedAt: Date;
    _count: RecruiterProfileCountAggregateOutputType | null;
    _min: RecruiterProfileMinAggregateOutputType | null;
    _max: RecruiterProfileMaxAggregateOutputType | null;
};
export type GetRecruiterProfileGroupByPayload<T extends RecruiterProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecruiterProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecruiterProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecruiterProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecruiterProfileGroupByOutputType[P]>;
}>>;
export type RecruiterProfileWhereInput = {
    AND?: Prisma.RecruiterProfileWhereInput | Prisma.RecruiterProfileWhereInput[];
    OR?: Prisma.RecruiterProfileWhereInput[];
    NOT?: Prisma.RecruiterProfileWhereInput | Prisma.RecruiterProfileWhereInput[];
    id?: Prisma.StringFilter<"RecruiterProfile"> | string;
    userId?: Prisma.StringFilter<"RecruiterProfile"> | string;
    companyName?: Prisma.StringFilter<"RecruiterProfile"> | string;
    companyRole?: Prisma.StringFilter<"RecruiterProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"RecruiterProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RecruiterProfile"> | Date | string;
    jobs?: Prisma.JobListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RecruiterProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyRole?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    jobs?: Prisma.JobOrderByRelationAggregateInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RecruiterProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.RecruiterProfileWhereInput | Prisma.RecruiterProfileWhereInput[];
    OR?: Prisma.RecruiterProfileWhereInput[];
    NOT?: Prisma.RecruiterProfileWhereInput | Prisma.RecruiterProfileWhereInput[];
    companyName?: Prisma.StringFilter<"RecruiterProfile"> | string;
    companyRole?: Prisma.StringFilter<"RecruiterProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"RecruiterProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RecruiterProfile"> | Date | string;
    jobs?: Prisma.JobListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type RecruiterProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyRole?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RecruiterProfileCountOrderByAggregateInput;
    _max?: Prisma.RecruiterProfileMaxOrderByAggregateInput;
    _min?: Prisma.RecruiterProfileMinOrderByAggregateInput;
};
export type RecruiterProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecruiterProfileScalarWhereWithAggregatesInput | Prisma.RecruiterProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecruiterProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecruiterProfileScalarWhereWithAggregatesInput | Prisma.RecruiterProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecruiterProfile"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RecruiterProfile"> | string;
    companyName?: Prisma.StringWithAggregatesFilter<"RecruiterProfile"> | string;
    companyRole?: Prisma.StringWithAggregatesFilter<"RecruiterProfile"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RecruiterProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RecruiterProfile"> | Date | string;
};
export type RecruiterProfileCreateInput = {
    id?: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    jobs?: Prisma.JobCreateNestedManyWithoutRecruiterInput;
    user: Prisma.UserCreateNestedOneWithoutRecruiterProfileInput;
};
export type RecruiterProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutRecruiterInput;
};
export type RecruiterProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.JobUpdateManyWithoutRecruiterNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRecruiterProfileNestedInput;
};
export type RecruiterProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutRecruiterNestedInput;
};
export type RecruiterProfileCreateManyInput = {
    id?: string;
    userId: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecruiterProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecruiterProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecruiterProfileNullableScalarRelationFilter = {
    is?: Prisma.RecruiterProfileWhereInput | null;
    isNot?: Prisma.RecruiterProfileWhereInput | null;
};
export type RecruiterProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyRole?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecruiterProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyRole?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecruiterProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    companyRole?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecruiterProfileScalarRelationFilter = {
    is?: Prisma.RecruiterProfileWhereInput;
    isNot?: Prisma.RecruiterProfileWhereInput;
};
export type RecruiterProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutUserInput, Prisma.RecruiterProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecruiterProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.RecruiterProfileWhereUniqueInput;
};
export type RecruiterProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutUserInput, Prisma.RecruiterProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecruiterProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.RecruiterProfileWhereUniqueInput;
};
export type RecruiterProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutUserInput, Prisma.RecruiterProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecruiterProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.RecruiterProfileUpsertWithoutUserInput;
    disconnect?: Prisma.RecruiterProfileWhereInput | boolean;
    delete?: Prisma.RecruiterProfileWhereInput | boolean;
    connect?: Prisma.RecruiterProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecruiterProfileUpdateToOneWithWhereWithoutUserInput, Prisma.RecruiterProfileUpdateWithoutUserInput>, Prisma.RecruiterProfileUncheckedUpdateWithoutUserInput>;
};
export type RecruiterProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutUserInput, Prisma.RecruiterProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.RecruiterProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.RecruiterProfileUpsertWithoutUserInput;
    disconnect?: Prisma.RecruiterProfileWhereInput | boolean;
    delete?: Prisma.RecruiterProfileWhereInput | boolean;
    connect?: Prisma.RecruiterProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecruiterProfileUpdateToOneWithWhereWithoutUserInput, Prisma.RecruiterProfileUpdateWithoutUserInput>, Prisma.RecruiterProfileUncheckedUpdateWithoutUserInput>;
};
export type RecruiterProfileCreateNestedOneWithoutJobsInput = {
    create?: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutJobsInput, Prisma.RecruiterProfileUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.RecruiterProfileCreateOrConnectWithoutJobsInput;
    connect?: Prisma.RecruiterProfileWhereUniqueInput;
};
export type RecruiterProfileUpdateOneRequiredWithoutJobsNestedInput = {
    create?: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutJobsInput, Prisma.RecruiterProfileUncheckedCreateWithoutJobsInput>;
    connectOrCreate?: Prisma.RecruiterProfileCreateOrConnectWithoutJobsInput;
    upsert?: Prisma.RecruiterProfileUpsertWithoutJobsInput;
    connect?: Prisma.RecruiterProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecruiterProfileUpdateToOneWithWhereWithoutJobsInput, Prisma.RecruiterProfileUpdateWithoutJobsInput>, Prisma.RecruiterProfileUncheckedUpdateWithoutJobsInput>;
};
export type RecruiterProfileCreateWithoutUserInput = {
    id?: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    jobs?: Prisma.JobCreateNestedManyWithoutRecruiterInput;
};
export type RecruiterProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    jobs?: Prisma.JobUncheckedCreateNestedManyWithoutRecruiterInput;
};
export type RecruiterProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.RecruiterProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutUserInput, Prisma.RecruiterProfileUncheckedCreateWithoutUserInput>;
};
export type RecruiterProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.RecruiterProfileUpdateWithoutUserInput, Prisma.RecruiterProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutUserInput, Prisma.RecruiterProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.RecruiterProfileWhereInput;
};
export type RecruiterProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.RecruiterProfileWhereInput;
    data: Prisma.XOR<Prisma.RecruiterProfileUpdateWithoutUserInput, Prisma.RecruiterProfileUncheckedUpdateWithoutUserInput>;
};
export type RecruiterProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.JobUpdateManyWithoutRecruiterNestedInput;
};
export type RecruiterProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jobs?: Prisma.JobUncheckedUpdateManyWithoutRecruiterNestedInput;
};
export type RecruiterProfileCreateWithoutJobsInput = {
    id?: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRecruiterProfileInput;
};
export type RecruiterProfileUncheckedCreateWithoutJobsInput = {
    id?: string;
    userId: string;
    companyName: string;
    companyRole: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecruiterProfileCreateOrConnectWithoutJobsInput = {
    where: Prisma.RecruiterProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutJobsInput, Prisma.RecruiterProfileUncheckedCreateWithoutJobsInput>;
};
export type RecruiterProfileUpsertWithoutJobsInput = {
    update: Prisma.XOR<Prisma.RecruiterProfileUpdateWithoutJobsInput, Prisma.RecruiterProfileUncheckedUpdateWithoutJobsInput>;
    create: Prisma.XOR<Prisma.RecruiterProfileCreateWithoutJobsInput, Prisma.RecruiterProfileUncheckedCreateWithoutJobsInput>;
    where?: Prisma.RecruiterProfileWhereInput;
};
export type RecruiterProfileUpdateToOneWithWhereWithoutJobsInput = {
    where?: Prisma.RecruiterProfileWhereInput;
    data: Prisma.XOR<Prisma.RecruiterProfileUpdateWithoutJobsInput, Prisma.RecruiterProfileUncheckedUpdateWithoutJobsInput>;
};
export type RecruiterProfileUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRecruiterProfileNestedInput;
};
export type RecruiterProfileUncheckedUpdateWithoutJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    companyRole?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type RecruiterProfileCountOutputType
 */
export type RecruiterProfileCountOutputType = {
    jobs: number;
};
export type RecruiterProfileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jobs?: boolean | RecruiterProfileCountOutputTypeCountJobsArgs;
};
/**
 * RecruiterProfileCountOutputType without action
 */
export type RecruiterProfileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfileCountOutputType
     */
    select?: Prisma.RecruiterProfileCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * RecruiterProfileCountOutputType without action
 */
export type RecruiterProfileCountOutputTypeCountJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JobWhereInput;
};
export type RecruiterProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    companyName?: boolean;
    companyRole?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    jobs?: boolean | Prisma.RecruiterProfile$jobsArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.RecruiterProfileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recruiterProfile"]>;
export type RecruiterProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    companyName?: boolean;
    companyRole?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recruiterProfile"]>;
export type RecruiterProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    companyName?: boolean;
    companyRole?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recruiterProfile"]>;
export type RecruiterProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    companyName?: boolean;
    companyRole?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RecruiterProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "companyName" | "companyRole" | "createdAt" | "updatedAt", ExtArgs["result"]["recruiterProfile"]>;
export type RecruiterProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jobs?: boolean | Prisma.RecruiterProfile$jobsArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.RecruiterProfileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RecruiterProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RecruiterProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RecruiterProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecruiterProfile";
    objects: {
        jobs: Prisma.$JobPayload<ExtArgs>[];
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        companyName: string;
        companyRole: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["recruiterProfile"]>;
    composites: {};
};
export type RecruiterProfileGetPayload<S extends boolean | null | undefined | RecruiterProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload, S>;
export type RecruiterProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecruiterProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecruiterProfileCountAggregateInputType | true;
};
export interface RecruiterProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecruiterProfile'];
        meta: {
            name: 'RecruiterProfile';
        };
    };
    /**
     * Find zero or one RecruiterProfile that matches the filter.
     * @param {RecruiterProfileFindUniqueArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecruiterProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, RecruiterProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RecruiterProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecruiterProfileFindUniqueOrThrowArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecruiterProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecruiterProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RecruiterProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindFirstArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecruiterProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, RecruiterProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RecruiterProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindFirstOrThrowArgs} args - Arguments to find a RecruiterProfile
     * @example
     * // Get one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecruiterProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecruiterProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RecruiterProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecruiterProfiles
     * const recruiterProfiles = await prisma.recruiterProfile.findMany()
     *
     * // Get first 10 RecruiterProfiles
     * const recruiterProfiles = await prisma.recruiterProfile.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RecruiterProfileFindManyArgs>(args?: Prisma.SelectSubset<T, RecruiterProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RecruiterProfile.
     * @param {RecruiterProfileCreateArgs} args - Arguments to create a RecruiterProfile.
     * @example
     * // Create one RecruiterProfile
     * const RecruiterProfile = await prisma.recruiterProfile.create({
     *   data: {
     *     // ... data to create a RecruiterProfile
     *   }
     * })
     *
     */
    create<T extends RecruiterProfileCreateArgs>(args: Prisma.SelectSubset<T, RecruiterProfileCreateArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RecruiterProfiles.
     * @param {RecruiterProfileCreateManyArgs} args - Arguments to create many RecruiterProfiles.
     * @example
     * // Create many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RecruiterProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, RecruiterProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RecruiterProfiles and returns the data saved in the database.
     * @param {RecruiterProfileCreateManyAndReturnArgs} args - Arguments to create many RecruiterProfiles.
     * @example
     * // Create many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RecruiterProfiles and only return the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RecruiterProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecruiterProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RecruiterProfile.
     * @param {RecruiterProfileDeleteArgs} args - Arguments to delete one RecruiterProfile.
     * @example
     * // Delete one RecruiterProfile
     * const RecruiterProfile = await prisma.recruiterProfile.delete({
     *   where: {
     *     // ... filter to delete one RecruiterProfile
     *   }
     * })
     *
     */
    delete<T extends RecruiterProfileDeleteArgs>(args: Prisma.SelectSubset<T, RecruiterProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RecruiterProfile.
     * @param {RecruiterProfileUpdateArgs} args - Arguments to update one RecruiterProfile.
     * @example
     * // Update one RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RecruiterProfileUpdateArgs>(args: Prisma.SelectSubset<T, RecruiterProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RecruiterProfiles.
     * @param {RecruiterProfileDeleteManyArgs} args - Arguments to filter RecruiterProfiles to delete.
     * @example
     * // Delete a few RecruiterProfiles
     * const { count } = await prisma.recruiterProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RecruiterProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecruiterProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RecruiterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RecruiterProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, RecruiterProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RecruiterProfiles and returns the data updated in the database.
     * @param {RecruiterProfileUpdateManyAndReturnArgs} args - Arguments to update many RecruiterProfiles.
     * @example
     * // Update many RecruiterProfiles
     * const recruiterProfile = await prisma.recruiterProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RecruiterProfiles and only return the `id`
     * const recruiterProfileWithIdOnly = await prisma.recruiterProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RecruiterProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecruiterProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RecruiterProfile.
     * @param {RecruiterProfileUpsertArgs} args - Arguments to update or create a RecruiterProfile.
     * @example
     * // Update or create a RecruiterProfile
     * const recruiterProfile = await prisma.recruiterProfile.upsert({
     *   create: {
     *     // ... data to create a RecruiterProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecruiterProfile we want to update
     *   }
     * })
     */
    upsert<T extends RecruiterProfileUpsertArgs>(args: Prisma.SelectSubset<T, RecruiterProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__RecruiterProfileClient<runtime.Types.Result.GetResult<Prisma.$RecruiterProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RecruiterProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileCountArgs} args - Arguments to filter RecruiterProfiles to count.
     * @example
     * // Count the number of RecruiterProfiles
     * const count = await prisma.recruiterProfile.count({
     *   where: {
     *     // ... the filter for the RecruiterProfiles we want to count
     *   }
     * })
    **/
    count<T extends RecruiterProfileCountArgs>(args?: Prisma.Subset<T, RecruiterProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecruiterProfileCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RecruiterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecruiterProfileAggregateArgs>(args: Prisma.Subset<T, RecruiterProfileAggregateArgs>): Prisma.PrismaPromise<GetRecruiterProfileAggregateType<T>>;
    /**
     * Group by RecruiterProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends RecruiterProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecruiterProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: RecruiterProfileGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecruiterProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecruiterProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RecruiterProfile model
     */
    readonly fields: RecruiterProfileFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RecruiterProfile.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RecruiterProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    jobs<T extends Prisma.RecruiterProfile$jobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecruiterProfile$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the RecruiterProfile model
 */
export interface RecruiterProfileFieldRefs {
    readonly id: Prisma.FieldRef<"RecruiterProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"RecruiterProfile", 'String'>;
    readonly companyName: Prisma.FieldRef<"RecruiterProfile", 'String'>;
    readonly companyRole: Prisma.FieldRef<"RecruiterProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"RecruiterProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RecruiterProfile", 'DateTime'>;
}
/**
 * RecruiterProfile findUnique
 */
export type RecruiterProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where: Prisma.RecruiterProfileWhereUniqueInput;
};
/**
 * RecruiterProfile findUniqueOrThrow
 */
export type RecruiterProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where: Prisma.RecruiterProfileWhereUniqueInput;
};
/**
 * RecruiterProfile findFirst
 */
export type RecruiterProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: Prisma.RecruiterProfileOrderByWithRelationInput | Prisma.RecruiterProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RecruiterProfiles.
     */
    cursor?: Prisma.RecruiterProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: Prisma.RecruiterProfileScalarFieldEnum | Prisma.RecruiterProfileScalarFieldEnum[];
};
/**
 * RecruiterProfile findFirstOrThrow
 */
export type RecruiterProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RecruiterProfile to fetch.
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: Prisma.RecruiterProfileOrderByWithRelationInput | Prisma.RecruiterProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RecruiterProfiles.
     */
    cursor?: Prisma.RecruiterProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: Prisma.RecruiterProfileScalarFieldEnum | Prisma.RecruiterProfileScalarFieldEnum[];
};
/**
 * RecruiterProfile findMany
 */
export type RecruiterProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RecruiterProfiles to fetch.
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecruiterProfiles to fetch.
     */
    orderBy?: Prisma.RecruiterProfileOrderByWithRelationInput | Prisma.RecruiterProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RecruiterProfiles.
     */
    cursor?: Prisma.RecruiterProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecruiterProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecruiterProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecruiterProfiles.
     */
    distinct?: Prisma.RecruiterProfileScalarFieldEnum | Prisma.RecruiterProfileScalarFieldEnum[];
};
/**
 * RecruiterProfile create
 */
export type RecruiterProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * The data needed to create a RecruiterProfile.
     */
    data: Prisma.XOR<Prisma.RecruiterProfileCreateInput, Prisma.RecruiterProfileUncheckedCreateInput>;
};
/**
 * RecruiterProfile createMany
 */
export type RecruiterProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecruiterProfiles.
     */
    data: Prisma.RecruiterProfileCreateManyInput | Prisma.RecruiterProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RecruiterProfile createManyAndReturn
 */
export type RecruiterProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * The data used to create many RecruiterProfiles.
     */
    data: Prisma.RecruiterProfileCreateManyInput | Prisma.RecruiterProfileCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RecruiterProfile update
 */
export type RecruiterProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * The data needed to update a RecruiterProfile.
     */
    data: Prisma.XOR<Prisma.RecruiterProfileUpdateInput, Prisma.RecruiterProfileUncheckedUpdateInput>;
    /**
     * Choose, which RecruiterProfile to update.
     */
    where: Prisma.RecruiterProfileWhereUniqueInput;
};
/**
 * RecruiterProfile updateMany
 */
export type RecruiterProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RecruiterProfiles.
     */
    data: Prisma.XOR<Prisma.RecruiterProfileUpdateManyMutationInput, Prisma.RecruiterProfileUncheckedUpdateManyInput>;
    /**
     * Filter which RecruiterProfiles to update
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * Limit how many RecruiterProfiles to update.
     */
    limit?: number;
};
/**
 * RecruiterProfile updateManyAndReturn
 */
export type RecruiterProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * The data used to update RecruiterProfiles.
     */
    data: Prisma.XOR<Prisma.RecruiterProfileUpdateManyMutationInput, Prisma.RecruiterProfileUncheckedUpdateManyInput>;
    /**
     * Filter which RecruiterProfiles to update
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * Limit how many RecruiterProfiles to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RecruiterProfile upsert
 */
export type RecruiterProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * The filter to search for the RecruiterProfile to update in case it exists.
     */
    where: Prisma.RecruiterProfileWhereUniqueInput;
    /**
     * In case the RecruiterProfile found by the `where` argument doesn't exist, create a new RecruiterProfile with this data.
     */
    create: Prisma.XOR<Prisma.RecruiterProfileCreateInput, Prisma.RecruiterProfileUncheckedCreateInput>;
    /**
     * In case the RecruiterProfile was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RecruiterProfileUpdateInput, Prisma.RecruiterProfileUncheckedUpdateInput>;
};
/**
 * RecruiterProfile delete
 */
export type RecruiterProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
    /**
     * Filter which RecruiterProfile to delete.
     */
    where: Prisma.RecruiterProfileWhereUniqueInput;
};
/**
 * RecruiterProfile deleteMany
 */
export type RecruiterProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RecruiterProfiles to delete
     */
    where?: Prisma.RecruiterProfileWhereInput;
    /**
     * Limit how many RecruiterProfiles to delete.
     */
    limit?: number;
};
/**
 * RecruiterProfile.jobs
 */
export type RecruiterProfile$jobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: Prisma.JobSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Job
     */
    omit?: Prisma.JobOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.JobInclude<ExtArgs> | null;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput | Prisma.JobOrderByWithRelationInput[];
    cursor?: Prisma.JobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JobScalarFieldEnum | Prisma.JobScalarFieldEnum[];
};
/**
 * RecruiterProfile without action
 */
export type RecruiterProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterProfile
     */
    select?: Prisma.RecruiterProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecruiterProfile
     */
    omit?: Prisma.RecruiterProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RecruiterProfileInclude<ExtArgs> | null;
};
//# sourceMappingURL=RecruiterProfile.d.ts.map