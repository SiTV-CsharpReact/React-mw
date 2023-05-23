import React, { useRef, useMemo } from 'react';
// import { Layout, TabSet, LayoutModel, DockLocation, LayoutActions } from 'flexlayout-react';

const MyLayout: React.FC = () => {
//   const layout = useRef<Layout | null>(null);

//   const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     const tabId = event.dataTransfer.getData('tabId');
//     const targetNodeId = event.currentTarget.getAttribute('data-nodeid');
//     if (!tabId || !targetNodeId || !layout.current) return;
    
//     const model = layout.current.getModel();
//     const targetNode = model.getNodeById(targetNodeId);
//     if (!targetNode) return;
    
//     model.doAction(LayoutActions.moveNode(tabId, targetNode.getId(), DockLocation.CENTER, -1));
//   };

//   const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const onDragStart = (event: React.DragEvent<HTMLDivElement>, tabId: string) => {
//     event.dataTransfer.setData('tabId', tabId);
//   };

//   const renderTab = (tab: TabSet.Tab) => {
//     return (
//       <div
//         key={tab.getId()}
//         draggable={true}
//         onDragStart={(event) => onDragStart(event, tab.getId())}
//       >
//         {tab.getName()}
//       </div>
//     );
//   };

//   const model = useMemo(() => {
//     return LayoutModel.fromJson({
//       global: {},
//       layout: {
//         type: 'row',
//         children: [
//           {
//             type: 'tabset',
//             children: [
//               { type: 'tab', name: 'Tab 1', component: 'Component 1' },
//               { type: 'tab', name: 'Tab 2', component: 'Component 2' },
//               { type: 'tab', name: 'Tab 3', component: 'Component 3' },
//             ],
//           },
//         ],
//       },
//     });
//   }, []);

//   return (
//     <div
//       style={{ width: '100%', height: '100%' }}
//       onDrop={onDrop}
//       onDragOver={onDragOver}
//     >
//       <Layout
//         ref={layout}
//         model={model}
//         factory={ReactComponentFactory}
//         classNameMapper={(clazz) => clazz}
//       />
//     </div>
//   );
// };
return(
    <>
    oke
    </>
)
}
export default MyLayout;
